<script setup>
import { ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import axios from '../axios';

const route = useRoute();
const apuntes = ref([]);
const materiaId = route.params.id;

const fetchApuntes = async () => {
  try {
    const { data } = await axios.get(`/materias/${materiaId}/apuntes`);
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
    <h1 class="mb-4">Apuntes de la Materia</h1>
    <div v-if="apuntes.length" class="list-group">
      <div
        v-for="apunte in apuntes"
        :key="apunte.id"
        class="list-group-item d-flex justify-content-between align-items-center"
      >
        <span>{{ apunte.titulo }}</span>
        <div>
          <RouterLink :to="`/apuntes/${apunte.id}`" class="btn btn-sm btn-info me-2">Ver Detalle</RouterLink>
          <RouterLink :to="`/apuntes/${apunte.id}/edit`" class="btn btn-sm btn-warning me-2">Editar</RouterLink>
          <button @click="deleteApunte(apunte.id)" class="btn btn-sm btn-danger">Eliminar</button>
        </div>
      </div>
    </div>
    <div v-else class="alert alert-info">No hay apuntes disponibles para esta materia.</div>
  </div>
</template>