import { useState } from "react";
import { MessageInterface } from "../interface";
import { postCategorys } from "../services/post";

export function useCreateCategoryHooks() {
    const [categoria, setCategoria] = useState("");
    const [modal, setModal] = useState<MessageInterface>({
        show: false,
        message: "",
        type: "info"
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!categoria || categoria.trim() === '') {
            setModal({ show: true, message: "Campo obrigatório", type: "warning" });
            return;
        }

        console.log(categoria)

        const data = {
            categoria: categoria
        };

        try {
            const result = await postCategorys(data);

            if (!result?.success) {
                setModal({ show: true, message: result?.message, type: "error" });
                return;
            }

            setCategoria("");
            setModal({ show: true, message: "Categoria cadastrada com sucesso!", type: "success" });

        } catch (error) {
            setModal({ show: true, message: "Erro ao conectar com o servidor.", type: "error" });
            console.error(error)
        }
    };

    return {
        handleSubmit, 
        modal,
        setCategoria,
        categoria,
        setModal
    }
}
