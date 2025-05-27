import { RegisterData, LoginData, RegisterCategory, ServicesData } from "../interface";
import Cookies from 'js-cookie';

const apiUrl = import.meta.env.VITE_API_URL;

const postRegister = async (data: RegisterData) => {
    try {

        if (!apiUrl) {
            throw new Error('URL da API não definida');
        }

        const response = await fetch(`${apiUrl}postRegisterUsers`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Falha ao registrar');
        }

        const result = await response.json();

        return result;
    } catch (error) {
        console.error('Erro no registro:', error);
        throw error;
    }
};

const postServices = async (data: ServicesData) => {
    try {

        if (!apiUrl) {
            throw new Error('URL da API não definida');
        }

        const response = await fetch(`${apiUrl}postServices`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Falha ao registrar');
        }

        const result = await response.json();

        return result;
    } catch (error) {
        console.error('Erro no registro:', error);
        throw error;
    }
};

const postCategorys = async (data: RegisterCategory) => {
    if (!apiUrl) {
        throw new Error('URL da API não definida');
    }

    try {

        const response = await fetch(`${apiUrl}postCategoryServices`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            throw new Error('Falha ao registrar');
        }

        const result = await response.json();

        return result;
    } catch (error) {
        console.error(error)
    }
}

const postLogin = async (data: LoginData) => {
    try {
        if (!apiUrl) {
            throw new Error('URL da API não definida');
        }

        const response = await fetch(`${apiUrl}postLogin`, {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Falha ao logar');
        }

        return await response.json();
    } catch (error) {
        console.error('Erro ao fazer login:', error);
        Cookies.remove('session_token');
        throw error;
    }
}

const postLogout = async () => {
    try {
        if (!apiUrl) {
            throw new Error('URL da API não definida');
        }

        const response = await fetch(`${apiUrl}postLogout`, {
            method: 'POST',
            credentials: 'include',
        });

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || 'Falha ao fazer logout');
        }

        return await response.json();
    } catch (error) {
        console.error('Erro ao fazer logout:', error);
        Cookies.remove('session_token');
        throw error;
    }
}

export { postRegister, postLogin, postCategorys, postServices, postLogout };
