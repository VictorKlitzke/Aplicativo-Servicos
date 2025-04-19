const apiUrl = import.meta.env.VITE_API_URL;


const getLogin = async () => {
    try {
        if (!apiUrl) {
            throw new Error('A URL da API não está definida no .env');
        }

        const response = await fetch(`${apiUrl}getLogin`, {
            method: 'GET',
        });

        const text = await response.text();
        console.log('Resposta da API:', text);

        if (!response.ok) {
            throw new Error(`Erro ${response.status}: ${text}`);
        }


        const result = JSON.parse(text);
        return result;

    } catch (error) {
        console.error('Erro ao buscar perfil na API:', error);
        throw error;
    }
};


export default getLogin;