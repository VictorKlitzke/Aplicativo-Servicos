import { useState } from "react";
import { postRegister } from "../services/post";
import { useNavigate } from "react-router-dom";

export function useRegisterHooks() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [typePerson, setPersonType] = useState<'cliente' | 'profissional'>('cliente');
    const navigate = useNavigate();

    const validateFields = () => {
        if (!name.trim()) {
            alert('Nome é obrigatório');
            return false;
        }
        if (!email.trim() || !email.includes('@')) {
            alert('Email inválido');
            return false;
        }
        if (password.length < 6) {
            alert('A senha deve ter pelo menos 6 caracteres');
            return false;
        }
        if (phone.length < 14) {
            alert('Telefone inválido');
            return false;
        }

        return true;
    };

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateFields()) return;

        const data = {
            nome: name,
            email: email,
            telefone: phone,
            password: password,
            userType: typePerson,
        };

        try {
            const registeredUser = await postRegister(data);

            localStorage.setItem('user', JSON.stringify(registeredUser));

            navigate('/');
        } catch (error) {
            console.error('Erro no registro:', error);
        }
    };

    return {
        handleRegister,
        setName,
        setEmail,
        setPassword,
        setPersonType,
        setPhone,
        name,
        email,
        password,
        phone,
        typePerson
    };
}