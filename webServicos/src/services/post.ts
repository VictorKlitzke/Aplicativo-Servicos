import { RegisterData, LoginData } from "../interface";

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

const postLogin = async (data: LoginData) => {
    try {

        if (!apiUrl) {
            throw new Error('URL da API não definida');
        }

        const response = await fetch(`${apiUrl}postLogin`, {
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
        console.error('Erro ao fazer login:', error);
        throw error;
    }
}

export { postRegister, postLogin };
