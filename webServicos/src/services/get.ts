const apiUrl = import.meta.env.VITE_API_URL;

const getLogin = async () => {
    try {
        if (!apiUrl) {
            throw new Error('A URL da API não está definida no .env');
        }

        const response = await fetch(`${apiUrl}getLogin`, {
            method: 'GET',
            credentials: 'include',
        });

        const result = await response.json();
        if (!response.ok) {
            throw new Error(`Erro ${response.status}: ${result}`);
        }

        return result;

    } catch (error) {
        console.error('Erro ao buscar perfil na API:', error);
        throw error;
    }
};
const getServices = async () => {
    try {
        if (!apiUrl) {
            throw new Error('A URL da API não está definida no .env');
        }

        const response = await fetch(`${apiUrl}getServices`, {
            method: 'GET',
            credentials: 'include',
        });

        const result = await response.json();
        if (!response.ok) {
            throw new Error(`Erro ${response.status}: ${result}`);
        }

        return result;

    } catch (error) {
        console.error('Erro ao buscar serviços na API:', error);
        throw error;
    }
};
const getServicesAgendamento = async () => {
    try {
        if (!apiUrl) {
            throw new Error('A URL da API não está definida no .env');
        }

        const response = await fetch(`${apiUrl}getServicesAgendamento`, {
            method: 'GET',
            credentials: 'include',
        });

        const result = await response.json();
        if (!response.ok) {
            throw new Error(`Erro ${response.status}: ${result}`);
        }

        return result;

    } catch (error) {
        console.error('Erro ao buscar getServicesAgendamento na API:', error);
        throw error;
    }
};
const getCategorys = async () => {
    try {
        if (!apiUrl) {
            throw new Error('A URL da API não está definida no .env');
        }

        const response = await fetch(`${apiUrl}getCategorys`, {
            method: 'GET',
            credentials: 'include',
        });

        const result = await response.json();
        if (!response.ok) {
            throw new Error(`Erro ${response.status}: ${result}`);
        }

        return result;

    } catch (error) {
        console.error('Erro ao buscar categoria na API:', error);
        throw error;
    }
};
const getCEP = async (cep: string) => {
    try {
        if (!apiUrl) {
            throw new Error('A URL da API não está definida no .env');
        }

        const response = await fetch(`${apiUrl}getCEP/${cep}`, {
            method: 'GET',
            credentials: 'include',
        });

        const result = await response.json();
        if (!response.ok) {
            throw new Error(`Erro ${response.status}: ${result}`);
        }

        return result;

    } catch (error) {
        console.error('Erro ao buscar CEP na API:', error);
        throw error;
    }
};
const getComentarys = async (id: string) => {
    try {
        if (!apiUrl) {
            throw new Error('A URL da API não está definida no .env');
        }

        const response = await fetch(`${apiUrl}getComentarios/${id}`, {
            method: 'GET',
            credentials: 'include',
        });

        const result = await response.json();
        if (!response.ok) {
            throw new Error(`Erro ${response.status}: ${result}`);
        }

        return result;
    } catch (error) {
        console.error(error)
    }
}


export { getLogin, getServices, getCategorys, getCEP, getServicesAgendamento, getComentarys };