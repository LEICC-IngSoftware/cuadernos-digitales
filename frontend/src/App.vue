<script setup>
import { RouterLink, RouterView } from 'vue-router';
import { ref } from 'vue';
import axios from './axios';
import { useRouter } from 'vue-router';

const isAuthenticated = ref(false);
const router = useRouter();

// Verificar si el usuario está autenticado al cargar la aplicación
const checkAuth = async () => {
  const token = localStorage.getItem('authToken');
  isAuthenticated.value = !!token;
};

checkAuth();

// Cerrar sesión
const logout = async () => {
  try {
    await axios.post('/auth/logout');
    localStorage.removeItem('authToken');
    isAuthenticated.value = false;
    router.push('/login');
  } catch (error) {
    console.error('Error al cerrar sesión:', error);
  }
};
</script>

<template>
  <header>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container">
        <RouterLink to="/" class="navbar-brand">Cuadernos Digitales</RouterLink>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <RouterLink to="/materias" class="nav-link">Materias</RouterLink>
            </li>
            <li class="nav-item">
              <RouterLink to="/apuntes" class="nav-link">Apuntes</RouterLink>
            </li>
            <li class="nav-item" v-if="isAuthenticated">
              <RouterLink to="/profile" class="nav-link">Perfil</RouterLink>
            </li>
            <li class="nav-item" v-if="!isAuthenticated">
              <RouterLink to="/login" class="nav-link">Iniciar Sesión</RouterLink>
            </li>
            <li class="nav-item" v-if="isAuthenticated">
              <button @click="logout" class="btn btn-link nav-link">Cerrar Sesión</button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </header>

  <RouterView />
</template>

<style scoped>
/* Puedes agregar estilos personalizados aquí si es necesario */
</style>
