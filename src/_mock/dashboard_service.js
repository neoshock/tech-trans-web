import { fetchWithToken } from '../utils/helper'; // Actualiza la ruta a la correcta

const API_URL = process.env.REACT_APP_API_BASE_URL; // Asume que API_URL es tu variable de entorno

export const getContentUpload = async () => {
    try {
        const response = await fetchWithToken(`${API_URL}/api/Dashboard/content-uploads`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        console.error('Ocurrió un error:', error);
        throw error;
    }
}

export const subjectByStudent = async () => {
    try {
        const response = await fetchWithToken(`${API_URL}/api/Dashboard/subjects-students`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        console.error('Ocurrió un error:', error);
        throw error;
    }
};

// {{URL_API}}/api/Dashboard/activity-history
export const fetchActivityHistory = async () => {
    try {
        const response = await fetchWithToken(`${API_URL}/api/Dashboard/activity-history`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        });
        return response.data;
    } catch (error) {
        console.error('Ocurrió un error:', error);
        throw error;
    }
};
