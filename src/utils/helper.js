// helper.js

export const fetchWithToken = async (url, options = {}) => {
    // Obtener el token desde el almacenamiento local
    const token = localStorage.getItem('token');

    // Inicializar las cabeceras
    const headers = new Headers(options.headers || {});

    // Añadir el token a las cabeceras
    headers.set('Authorization', `Bearer ${token}`);

    // Añadir más cabeceras si es necesario, como 'Content-Type'
    if (options.body) {
        headers.set('Content-Type', 'application/json');
    }

    // Combinar las opciones existentes con las cabeceras actualizadas
    const newOptions = {
        ...options,
        headers,
    };

    // Realizar la petición
    const response = await fetch(url, newOptions);

    // Comprobar el estado de la respuesta
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }

    // Devolver la respuesta como JSON
    return response.json();
};
