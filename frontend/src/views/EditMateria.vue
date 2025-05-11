<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from '../axios';

const nombre = ref('');
const router = useRouter();
const route = useRoute();

const fetchMateria = async () => {
  try {
    const { data } = await axios.get(`/materias/${route.params.id}`);
    nombre.value = data[0].nombre;
  } catch (error) {
    console.error('Error al obtener la materia:', error);
  }
};

const updateMateria = async () => {
  try {
    await axios.put(`/materias/${route.params.id}`, { materia: nombre.value });
    router.push('/materias');
  } catch (error) {
    console.error('Error al actualizar la materia:', error);
  }
};

onMounted(fetchMateria);
</script>

<template>
  <div class="container mt-5">
    <h1 class="mb-4">Editar Materia</h1>
    <form @submit.prevent="updateMateria" class="card p-4 shadow-sm">
      <div class="mb-3">
        <label for="nombre" class="form-label">Nombre de la Materia:</label>
        <input id="nombre" v-model="nombre" type="text" class="form-control" required />
      </div>
      <button type="submit" class="btn btn-primary w-100">Actualizar</button>
    </form>
  </div>
</template>