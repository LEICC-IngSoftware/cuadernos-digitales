<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from '../axios';

const contenido = ref('');
const titulo = ref(''); // Nuevo campo para el título
const materia_id = ref('');
const materias = ref([]);
const router = useRouter();
const route = useRoute();

const fetchApunte = async () => {
  try {
    const { data } = await axios.get(`/apuntes/${route.params.id}`);
    const apunte = data[0];
    contenido.value = apunte.contenido;
    titulo.value = apunte.titulo; // Asignar el título
    materia_id.value = apunte.materia_id;
  } catch (error) {
    console.error('Error al obtener el apunte:', error);
  }
};

const fetchMaterias = async () => {
  try {
    const { data } = await axios.get('/materias');
    materias.value = data;
  } catch (error) {
    console.error('Error al obtener las materias:', error);
  }
};

const updateApunte = async () => {
  try {
    await axios.put(`/apuntes/${route.params.id}`, {
      contenido: contenido.value,
      titulo: titulo.value, // Enviar el título al API
      materia_id: materia_id.value,
    });
    router.push('/apuntes');
  } catch (error) {
    console.error('Error al actualizar el apunte:', error);
  }
};

onMounted(() => {
  fetchApunte();
  fetchMaterias();
});
</script>

<template>
  <div class="container mt-5">
    <h1 class="mb-4">Editar Apunte</h1>
    <form @submit.prevent="updateApunte" class="card p-4 shadow-sm">
      <div class="mb-3">
        <label for="materia_id" class="form-label">Materia:</label>
        <select id="materia_id" v-model="materia_id" class="form-select" required>
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
      <button type="submit" class="btn btn-primary w-100">Actualizar</button>
    </form>
  </div>
</template>

<style scoped>
/* Puedes agregar estilos personalizados aquí si es necesario */
</style>