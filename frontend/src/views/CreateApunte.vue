<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from '../axios';

const router = useRouter();
const materias = ref([]);
const selectedMateriaId = ref('');
const contenido = ref('');
const titulo = ref(''); // Nuevo campo para el título

// Obtener el listado de materias al montar el componente
onMounted(async () => {
  try {
    const { data } = await axios.get('/materias');
    materias.value = data;
  } catch (error) {
    console.error('Error al obtener las materias:', error);
  }
});

// Crear un nuevo apunte
const createApunte = async () => {
  try {
    await axios.post('/apuntes', {
      materia_id: selectedMateriaId.value,
      contenido: contenido.value,
      titulo: titulo.value, // Enviar el título al API
    });
    router.push('/apuntes');
  } catch (error) {
    console.error('Error al crear el apunte:', error);
  }
};
</script>

<template>
  <div class="container mt-5">
    <h1 class="mb-4">Crear Nuevo Apunte</h1>
    <form @submit.prevent="createApunte" class="card p-4 shadow-sm">
      <div class="mb-3">
        <label for="materia_id" class="form-label">Materia:</label>
        <select id="materia_id" v-model="selectedMateriaId" class="form-select" required>
          <option value="" disabled>Selecciona una materia</option>
          <option v-for="materia in materias" :key="materia.id" :value="materia.id">
            {{ materia.nombre }}
          </option>
        </select>
      </div>
      <div class="mb-3">
        <label for="titulo" class="form-label">Título:</label> <!-- Nuevo campo -->
        <input id="titulo" v-model="titulo" class="form-control" type="text" required />
      </div>
      <div class="mb-3">
        <label for="contenido" class="form-label">Contenido:</label>
        <textarea id="contenido" v-model="contenido" class="form-control" rows="5" required></textarea>
      </div>
      <div class="d-flex justify-content-between">
        <button type="submit" class="btn btn-primary">Crear</button>
        <RouterLink to="/apuntes" class="btn btn-secondary">Cancelar</RouterLink>
      </div>
    </form>
  </div>
</template>

<style scoped>
/* Puedes agregar estilos personalizados aquí si es necesario */
</style>