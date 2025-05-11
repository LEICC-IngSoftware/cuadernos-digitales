<script setup>
import { ref, onMounted } from 'vue';
import axios from '../axios'; // Asegúrate de usar la configuración de axios

const user = ref(null);
const errorMessage = ref('');

onMounted(async () => {
  try {
    const { data } = await axios.get('/auth/user');
    user.value = data.user;
  } catch (error) {
    console.error('Error al obtener los datos del usuario:', error);
    errorMessage.value = 'No se pudieron cargar los datos del usuario.';
  }
});
</script>

<template>
  <div class="container mt-5">
    <h1 class="mb-4">Perfil de Usuario</h1>
    <div v-if="user" class="card shadow-sm">
      <div class="card-body">
        <p><strong>ID:</strong> {{ user.id }}</p>
        <p><strong>Email:</strong> {{ user.email }}</p>
        <p><strong>Creado el:</strong> {{ new Date(user.created_at).toLocaleString() }}</p>
      </div>
    </div>
    <div v-else class="alert alert-danger" v-if="errorMessage">
      {{ errorMessage }}
    </div>
  </div>
</template>

<style scoped>
/* Puedes agregar estilos personalizados aquí si es necesario */
</style>