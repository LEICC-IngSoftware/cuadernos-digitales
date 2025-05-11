<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from '../axios';

const email = ref('');
const password = ref('');
const router = useRouter();

const register = async () => {
  try {
    await axios.post('/auth/register', { email: email.value, password: password.value });
    router.push('/login');
  } catch (error) {
    console.error('Error al crear cuenta:', error);
  }
};
</script>

<template>
  <div class="container mt-5">
    <h1 class="mb-4">Crear Cuenta</h1>
    <form @submit.prevent="register" class="card p-4 shadow-sm">
      <div class="mb-3">
        <label for="email" class="form-label">Correo Electrónico:</label>
        <input id="email" v-model="email" type="email" class="form-control" required />
      </div>
      <div class="mb-3">
        <label for="password" class="form-label">Contraseña:</label>
        <input id="password" v-model="password" type="password" class="form-control" required />
      </div>
      <button type="submit" class="btn btn-primary w-100">Crear Cuenta</button>
    </form>
    <div class="mt-3 text-center">
      <RouterLink to="/login" class="text-decoration-none">¿Ya tienes una cuenta? Iniciar Sesión</RouterLink>
    </div>
  </div>
</template>

<style scoped>
/* Puedes agregar estilos personalizados aquí si es necesario */
</style>