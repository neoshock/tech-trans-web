// userService.js

import { fetchWithToken } from '../utils/helper'; // Actualiza la ruta a la correcta

const API_URL = process.env.REACT_APP_API_BASE_URL; // Asume que API_URL es tu variable de entorno

export const fetchUserActivity = async (roleId) => {
  try {
    const response = await fetchWithToken(`${API_URL}/api/UserActivity?rolId=${roleId}`, {
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
