import { useEffect, useState } from "react";
import { getCategorys, getCEP } from "../services/get";
import { postServices } from "../services/post";
import { Categoria, MessageInterface, ServicesData } from "../interface";
import { useNavigate } from "react-router-dom";

export function useCreateServicesHooks() {
    const navigate = useNavigate();
    const [modal, setModal] = useState<MessageInterface>({
        show: false,
        message: "",
        type: "info",
    });

    const [categorias, setCategorys] = useState<Categoria[]>([]);
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState<ServicesData>({
        titulo: "",
        categoria: "",
        preco: "",
        descricao: "",
        tempoExecucao: "",
        cidade: "",
        cep: "",
        estado: "",
        tipoAtendimento: "presencial",
        imagem: "",
    });

    useEffect(() => {
        const fetchCategorys = async () => {
            setLoading(true);
            try {
                const result = await getCategorys();
                setCategorys(result.getCategorys);
            } catch (error) {
                setModal({
                    show: true,
                    message: "Erro ao buscar as categorias.",
                    type: "error",
                });
                console.error(error);
            } finally {
                setLoading(false);
            }
        };
        fetchCategorys();
    }, []);

    const fetchCEP = async (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        const { name, value } = e.target;
        const updatedValue = name === "cep" ? value.replace(/\D/g, "") : value;

        setFormData((prev) => ({
            ...prev,
            [name]: updatedValue,
        }));

        if (name === "cep" && updatedValue.length === 8) {
            try {
                const endereco = await getCEP(updatedValue);
                setFormData((prev) => ({
                    ...prev,
                    cidade: endereco.getCEP.city || "",
                    estado: endereco.getCEP.state || "",
                }));
            } catch (error) {
                setModal({
                    show: true,
                    message: "CEP inválido ou não encontrado.",
                    type: "error",
                });
                console.error("Erro ao buscar CEP:", error);
            }
        }
    };

    const handleChange = (
        e: React.ChangeEvent<
            HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
        >
    ) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!isNaN(Number(formData.preco))) {
            formData.preco = `R$ ${parseFloat(formData.preco).toFixed(2)}`;
        }

        if (validateForm()) {
            const response = await postServices(formData);

            if (response.success) {
                setModal({
                    show: true,
                    message: "Sucesso, serviço registrado",
                    type: "success",
                });

                navigate('/myservices');
            }
        } else {
            console.log("Por favor, preencha todos os campos obrigatórios.");
            setModal({
                show: true,
                message: "Por favor, preencha todos os campos obrigatórios.",
                type: "error",
            });
        }
    };

    const validateForm = () => {
        return (
            formData.titulo &&
            formData.categoria &&
            formData.preco &&
            formData.tempoExecucao &&
            formData.cep &&
            formData.tempoExecucao &&
            formData.cidade &&
            formData.estado
        );
    };

    return {
        modal, setModal,
        validateForm,
        handleChange,
        handleSubmit,
        fetchCEP,
        categorias, setCategorys,
        loading, setLoading
    }
}