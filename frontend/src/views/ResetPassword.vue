<script setup>
import { ref } from 'vue';
import axios from '../axios';

const email = ref('');

const resetPassword = async () => {
  try {
    await axios.post('/auth/reset-password', { email: email.value });
    alert('Correo de recuperación enviado.');
  } catch (error) {
    console.error('Error al enviar correo de recuperación:', error);
  }
};
</script>

<template>
  <div class="container mt-5">
    <h1 class="mb-4">Recuperar Contraseña</h1>
    <form @submit.prevent="resetPassword" class="card p-4 shadow-sm">
      <div class="mb-3">
        <label for="email" class="form-label">Correo Electrónico:</label>
        <input id="email" v-model="email" type="email" class="form-control" required />
      </div>
      <button type="submit" class="btn btn-primary">Enviar Correo de Recuperación</button>
    </form>
  </div>
</template>