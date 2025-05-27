import { useEffect, useState } from "react";
import { MessageInterface, ProfileData } from "../interface";
import { getCEP, getLogin } from "../services/get";
import { updateProfile } from "../services/update";

export function useProfileHooks() {
    const [profile, setProfile] = useState<ProfileData>({
        nome: '',
        email: '',
        telefone: '',
        tipo: '',
        data_cadastro: '',
        cep: '',
        estado: '',
        cidade: '',
        cpfcnpj: '',
        sobre: '',
        instagram: '',
        whatsapp: '',
        foto_perfil: null,
        banner_perfil: null,
        status: 'Ativo',
        ultimo_login: '',
      });
      const [editMode, setEditMode] = useState(false);
      const [showModal, setShowModal] = useState(false);
      const [modal, setModal] = useState<MessageInterface>({
        show: false,
        message: "",
        type: "info",
      });
    
      useEffect(() => {
        const fetchProfile = async () => {
          try {
            const result = await getLogin();
            setProfile((prev) => ({ ...prev, ...result.getLogin[0] }));
          } catch (err) {
            console.error("Erro ao buscar perfil", err);
          }
        };
    
        fetchProfile();
      }, []);
    
      const fetchCEP = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        const cleanedValue = value.replace(/\D/g, '');
    
        if (name === 'cep' && cleanedValue.length === 8) {
          try {
            const endereco = await getCEP(cleanedValue);
            setProfile((prev) => ({
              ...prev,
              cidade: endereco.getCEP.city || '',
              estado: endereco.getCEP.state || '',
              cep: cleanedValue,
            }));
          } catch (error) {
            setModal({
              show: true,
              message: 'CEP inválido ou não encontrado.',
              type: 'error',
            });
            console.error(error);
          }
        }
      };
    
      const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, files } = e.target as HTMLInputElement;
    
        if (files && files.length > 0) {
          const file = files[0];
          const reader = new FileReader();
          reader.onloadend = () => {
            setProfile((prev) => ({ ...prev, [name]: reader.result as string }));
          };
          reader.readAsDataURL(file); 
        } else {
          setProfile((prev) => ({ ...prev, [name]: value }));
        }
      };
    
      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
          const formData = new FormData();
    
          Object.entries(profile).forEach(([key, value]) => {
            if (value !== null && value !== undefined) {
              formData.append(key, value as Blob | string);
            }
          });
    
          console.log([...formData.entries()]);
          console.log(formData)
    
          const response = await updateProfile(formData);
          if (response?.success) {
            setModal({
              show: true,
              message: "Sucesso ao atualizar seu perfil",
              type: "success",
            });
          }
        } catch (err) {
          console.error('Erro ao enviar dados:', err);
          setModal({
            show: true,
            message: "Erro ao fazer atualização",
            type: "error",
          });
        }
      };
    
      const calcularCompleto = () => {
        const campos = ['nome', 'email', 'telefone', 'cpfcnpj', 'cep', 'estado', 'cidade'];
        const preenchidos = campos.filter(c => profile[c as keyof typeof profile]);
        return Math.floor((preenchidos.length / campos.length) * 100);
      };

    return {
        calcularCompleto,
        handleSubmit,
        handleChange,
        editMode, setEditMode,
        showModal, setShowModal,
        modal, setModal,
        fetchCEP,
        profile
    }
}