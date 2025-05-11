<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from '../axios';

const nombre = ref('');
const router = useRouter();

const createMateria = async () => {
  try {
    await axios.post('/materias', { materia: nombre.value });
    router.push('/materias');
  } catch (error) {
    console.error('Error al crear la materia:', error);
  }
};
</script>

<template>
  <div class="container mt-5">
    <h1 class="mb-4">Crear Nueva Materia</h1>
    <form @submit.prevent="createMateria" class="card p-4 shadow-sm">
      <div class="mb-3">
        <label for="nombre" class="form-label">Nombre de la Materia:</label>
        <input id="nombre" v-model="nombre" type="text" class="form-control" required />
      </div>
      <button type="submit" class="btn btn-primary w-100">Crear</button>
    </form>
  </div>
</template>