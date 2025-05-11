import axios from 'axios';

axios.defaults.baseURL = 'http://localhost:3000'; // Cambia esto si tu backend está en otro dominio o puerto

// Agregar el token de autenticación a cada solicitud
axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = token;
    }
    return config;
});

export default axios;