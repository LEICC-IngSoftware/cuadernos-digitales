<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from '../axios';

const email = ref('');
const password = ref('');
const router = useRouter();

const login = async () => {
  try {
    const { data } = await axios.post('/auth/login', { email: email.value, password: password.value });
    localStorage.setItem('authToken', data.token); // Almacenar el token
    router.push('/apuntes');
  } catch (error) {
    console.error('Error al iniciar sesión:', error);
  }
};
</script>

<template>
  <div class="container mt-5">
    <h1 class="mb-4">Iniciar Sesión</h1>
    <form @submit.prevent="login" class="card p-4 shadow-sm">
      <div class="mb-3">
        <label for="email" class="form-label">Correo Electrónico:</label>
        <input id="email" v-model="email" type="email" class="form-control" required />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Contraseña:</label>
        <input id="password" v-model="password" type="password" class="form-control" required />
      </div>
      <button type="submit" class="btn btn-primary w-100">Iniciar Sesión</button>
    </form>
    <div class="mt-3 text-center">
      <RouterLink to="/register" class="text-decoration-none">¿No tienes una cuenta? Crear cuenta</RouterLink>
      <br />
      <RouterLink to="/reset-password" class="text-decoration-none">¿Olvidaste tu contraseña? Recuperar contraseña</RouterLink>
    </div>
  </div>
</template>

<style scoped>
/* Puedes agregar estilos personalizados aquí si es necesario */
</style>