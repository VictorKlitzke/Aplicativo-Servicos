import React, { useState } from "react";
import CreatePage from "../base/create_page";
import { postCategorys } from "../../../services/post";
import MessageComponets from "../../../components/modal/message_components";
import { MessageInterface } from "../../../interface";

export default function CreateCategorysPage() {
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

    return (
        <>
            <CreatePage
                title="➕ Cadastrar Categoria"
                onSubmit={handleSubmit}
                fields={[
                    {
                        label: "Categoria",
                        name: "categoria",
                        type: "text",
                        value: categoria,
                        onChange: (e) => setCategoria(e.target.value),
                    },
                ]}
            />
            <MessageComponets
                show={modal.show}
                type={modal.type}
                title={modal.type}
                message={modal.message}
                onClose={() => setModal({ ...modal, show: false })}
            />
        </>
    );
}
