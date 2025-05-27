import { useState, useCallback, useMemo } from "react";
import { MessageInterface, Categoria } from "../interface";
import { getCategorys } from "../services/get";
import { postServices } from "../services/post";
import { useNavigate } from "react-router-dom";

export function useCreateServiceHooks() {
    const [formData, setFormData] = useState({
        titulo: "",
        categoria: "",
        preco: "",
        tempoExecucao: "",
        cep: "",
        cidade: "",
        estado: "",
        tipoAtendimento: "",
        descricao: ""
    });
    const [categorias, setCategorias] = useState<Categoria[]>([]);
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState<MessageInterface>({
        show: false,
        message: "",
        type: "info"
    });
    const navigate = useNavigate();

    const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    }, []);

    const fetchCEP = useCallback(async (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const cep = e.target.value.replace(/\D/g, '');
        if (cep.length === 8) {
            try {
                const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
                const data = await response.json();
                if (!data.erro) {
                    setFormData(prev => ({
                        ...prev,
                        cidade: data.localidade,
                        estado: data.uf
                    }));
                }
            } catch {
                console.error('Erro ao buscar CEP');
            }
        }
    }, []);

    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await postServices(formData);
            if (response.success) {
                setModal({
                    show: true,
                    message: "Serviço cadastrado com sucesso!",
                    type: "success"
                });
                navigate("/myservices");
            } else {
                setModal({
                    show: true,
                    message: response.message || "Erro ao cadastrar serviço",
                    type: "error"
                });
            }
        } catch (error) {
            console.error('Erro ao cadastrar serviço:', error);
            setModal({
                show: true,
                message: "Erro ao cadastrar serviço",
                type: "error"
            });
        } finally {
            setLoading(false);
        }
    }, [formData, navigate]);

    const fetchCategorys = useCallback(async () => {
        try {
            const result = await getCategorys();
            setCategorias(result.getCategorys);
        } catch (error) {
            console.error('Erro ao buscar categorias:', error);
        }
    }, []);

    const closeModal = useCallback(() => {
        setModal(prev => ({ ...prev, show: false }));
    }, []);

    const isFormValid = useMemo(() => {
        return formData.titulo && 
               formData.categoria && 
               formData.preco && 
               formData.tempoExecucao && 
               formData.cep && 
               formData.cidade && 
               formData.estado && 
               formData.tipoAtendimento && 
               formData.descricao;
    }, [formData]);

    return {
        formData,
        handleChange,
        handleSubmit,
        fetchCEP,
        categorias,
        loading,
        modal,
        setModal,
        fetchCategorys,
        closeModal,
        isFormValid
    };
} 