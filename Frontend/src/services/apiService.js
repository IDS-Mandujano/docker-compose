const API_URL = import.meta.env.VITE_API_URL;

export const fetchUserData = async () => {
    try {
        const response = await fetch(`${API_URL}/Mandujano`);

        if (!response.ok) {
            throw new Error('Error en la red o el servidor no responde.');
        }

        const data = await response.json();
        
        return data;

    } catch (error) {
        throw error;
    }
};