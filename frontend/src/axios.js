import axios from 'axios';


axios.defaults.baseURL = import.meta.env.BASE_URL;

// Agregar el token de autenticación a cada solicitud
axios.interceptors.request.use((config) => {
    const token = localStorage.getItem('authToken');
    if (token) {
        config.headers.Authorization = token;
    }
    return config;
});

export default axios;