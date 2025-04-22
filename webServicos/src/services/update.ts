const apiUrl = import.meta.env.VITE_API_URL;

const updateProfile = async (formData: FormData) => {
    try {
        if (!apiUrl) {
            throw new Error('URL da API não definida');
        }

        const response = await fetch(`${apiUrl}updateProfile`, {
            method: 'PUT',
            credentials: 'include',
           body: formData
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

export { updateProfile }