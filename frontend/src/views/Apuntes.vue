<script setup>
import { ref, onMounted } from 'vue';
import axios from '../axios'; // Asegúrate de usar la configuración de axios
import { useRouter } from 'vue-router';

const apuntes = ref([]);
const router = useRouter();

const fetchApuntes = async () => {
  try {
    const { data } = await axios.get('/apuntes');
    apuntes.value = data;
  } catch (error) {
    console.error('Error al obtener los apuntes:', error);
  }
};

const deleteApunte = async (id) => {
  if (confirm('¿Estás seguro de que deseas eliminar este apunte?')) {
    try {
      await axios.delete(`/apuntes/${id}`);
      fetchApuntes(); // Actualizar la lista de apuntes
    } catch (error) {
      console.error('Error al eliminar el apunte:', error);
    }
  }
};

onMounted(fetchApuntes);
</script>

<template>
  <div class="container mt-5">
    <h1 class="mb-4">Listado de Apuntes</h1>
    <div class="d-flex justify-content-between align-items-center mb-3">
      <p class="mb-0">Aquí puedes ver todos tus apuntes.</p>
      <RouterLink to="/apuntes/create" class="btn btn-primary">Crear Nuevo Apunte</RouterLink>
    </div>
    <div v-if="apuntes.length" class="list-group">
      <div
        v-for="apunte in apuntes"
        :key="apunte.id"
        class="list-group-item d-flex justify-content-between align-items-center"
      >
        <RouterLink :to="`/apuntes/${apunte.id}`" class="text-decoration-none">
          {{ apunte.contenido }}
        </RouterLink>
        <div>
          <RouterLink :to="`/apuntes/${apunte.id}/edit`" class="btn btn-sm btn-warning me-2">Editar</RouterLink>
          <button @click="deleteApunte(apunte.id)" class="btn btn-sm btn-danger">Eliminar</button>
        </div>
      </div>
    </div>
    <div v-else class="alert alert-info">
      No tienes apuntes creados. ¡Crea uno nuevo para comenzar!
    </div>
  </div>
</template>

<style scoped>
/* Puedes agregar estilos personalizados aquí si es necesario */
</style>