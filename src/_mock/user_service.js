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
    console.log(response);
    return response.data;
  } catch (error) {
    console.error('Ocurrió un error:', error);
    throw error;
  }
};

export const createUserByStudent = async (student) => {
  console.log(student);
  try {
    const response = await fetchWithToken(`${API_URL}/api/User`, {
      method: 'POST',
      body: JSON.stringify(student),
    });
    return response;
  } catch (error) {
    return {
      statusCode: error.response.status,
      message: 'Ocurrió un error al registrar el usuario',
    }
  }
}

export const getUsersBySubject = async (subjectId) => {
  try {
    const response = await fetchWithToken(`${API_URL}/api/subject/${subjectId}/students`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    }); return response.data;
  } catch (error) {
    console.error('Ocurrió un error:', error);
    throw error;
  }
}

export const getUsersNotInSubject = async (subjectId) => {
  try {
    const response = await fetchWithToken(`${API_URL}/api/subject/${subjectId}/students?notInSubject=true`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    }); return response.data;
  } catch (error) {
    console.error('Ocurrió un error:', error);
    throw error;
  }
}

export const addUserToSubject = async (subjectId, studentId) => {
  try {
    const response = await fetchWithToken(`${API_URL}/api/subject/${subjectId}/student/${studentId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return response.data;
  } catch (error) {
    console.error('Ocurrió un error:', error);
    throw error;
  }
}

export const fetchUsersByTeacher = async () => {
  try {
    const response = await fetchWithToken(`${API_URL}/api/teacher/students`, {
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
