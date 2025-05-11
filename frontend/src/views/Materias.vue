<script setup>
import { ref, onMounted } from 'vue';
import axios from '../axios';
import { useRouter } from 'vue-router';

const materias = ref([]);
const router = useRouter();

const fetchMaterias = async () => {
  try {
    const { data } = await axios.get('/materias');
    materias.value = data;
  } catch (error) {
    console.error('Error al obtener las materias:', error);
  }
};

const deleteMateria = async (id) => {
  if (confirm('¿Estás seguro de que deseas eliminar esta materia?')) {
    try {
      await axios.delete(`/materias/${id}`);
      fetchMaterias(); // Actualizar la lista
    } catch (error) {
      console.error('Error al eliminar la materia:', error);
    }
  }
};

onMounted(fetchMaterias);
</script>

<template>
  <div class="container mt-5">
    <h1 class="mb-4">Materias</h1>
    <RouterLink to="/materias/create" class="btn btn-primary mb-3">Crear Nueva Materia</RouterLink>
    <div v-if="materias.length" class="list-group">
      <div
        v-for="materia in materias"
        :key="materia.id"
        class="list-group-item d-flex justify-content-between align-items-center"
      >
        <span>{{ materia.nombre }}</span>
        <div>
          <RouterLink :to="`/materias/${materia.id}/edit`" class="btn btn-sm btn-warning me-2">Editar</RouterLink>
          <button @click="deleteMateria(materia.id)" class="btn btn-sm btn-danger">Eliminar</button>
        </div>
      </div>
    </div>
    <div v-else class="alert alert-info">No hay materias disponibles.</div>
  </div>
</template>