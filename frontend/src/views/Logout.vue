const logout = async () => {
  try {
    await axios.post('/auth/logout');
    localStorage.removeItem('authToken'); // Eliminar el token
    router.push('/login');
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
  }
};