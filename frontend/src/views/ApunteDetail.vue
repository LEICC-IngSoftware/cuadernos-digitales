<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from '../axios'; // Asegúrate de usar la configuración de axios

const route = useRoute();
const apunte = ref(null);

onMounted(async () => {
  try {
    const { data } = await axios.get(`/apuntes/${route.params.id}`);
    apunte.value = data[0];
  } catch (error) {
    console.error('Error al obtener el detalle del apunte:', error);
  }
});
</script>

<template>
  <div class="container mt-5">
    <div class="card shadow-sm">
      <div class="card-header">
        <h1 class="h5 mb-0">Detalle del Apunte</h1>
      </div>
      <div class="card-body">
        <p v-if="apunte" class="mb-3">
          <strong>Contenido:</strong> {{ apunte.contenido }}
        </p>
        <p v-else class="text-muted">Cargando el detalle del apunte...</p>
        <RouterLink to="/apuntes" class="btn btn-secondary">Volver a la lista</RouterLink>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Puedes agregar estilos personalizados aquí si es necesario */
</style>