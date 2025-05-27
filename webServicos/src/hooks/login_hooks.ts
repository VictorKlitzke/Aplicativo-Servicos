import { useNavigate } from "react-router-dom";
import { postLogin } from "../services/post";
import { MessageInterface } from "../interface";
import { useState } from "react";
import usePreventBack from ".";

export function useLoginHooks() {
    usePreventBack();
    const [email, setEmail] = useState("");
    const [isLoanding, setLoading] = useState(false);
    const [password, setPassword] = useState("");
    const [modal, setModal] = useState<MessageInterface>({
        show: false,
        message: "",
        type: "info",
    });
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        const data = {
            email: email,
            senha: password,
        };
        setLoading(true);
        try {
            const response = await postLogin(data);
            if (response.success) {
                navigate("/homePage");
            } else {
                setModal({
                    show: true,
                    message: "Credenciais inválidas.",
                    type: "info",
                });
                setLoading(false);
            }
        } catch (error) {
            console.error("Erro no login:", error);
            setModal({
                show: true,
                message: "Erro ao tentar logar. Tente novamente mais tarde.",
                type: "error",
            });
        } finally {
            setLoading(false);
        }
    };

    return {
        email,
        setEmail,
        password,
        setPassword,
        isLoanding,
        modal,
        handleLogin,
        setModal
    };
}