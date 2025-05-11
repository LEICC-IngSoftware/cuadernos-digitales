import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/HomeView.vue';
import About from '../views/AboutView.vue';
import Apuntes from '../views/Apuntes.vue';
import Login from '../views/Login.vue';
import Register from '../views/Register.vue';
import ResetPassword from '../views/ResetPassword.vue';
import CreateApunte from '../views/CreateApunte.vue';
import ApunteDetail from '../views/ApunteDetail.vue';
import UserProfile from '../views/UserProfile.vue';
import Materias from '../views/Materias.vue';
import CreateMateria from '../views/CreateMateria.vue';
import EditMateria from '../views/EditMateria.vue';
import EditApunte from '../views/EditApunte.vue';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/about', name: 'About', component: About },
  { path: '/apuntes', name: 'Apuntes', component: Apuntes },
  { path: '/apuntes/create', name: 'CreateApunte', component: CreateApunte },
  { path: '/apuntes/:id', name: 'ApunteDetail', component: ApunteDetail },
  { path: '/apuntes/:id/edit', name: 'EditApunte', component: EditApunte },
  { path: '/login', name: 'Login', component: Login },
  { path: '/register', name: 'Register', component: Register },
  { path: '/reset-password', name: 'ResetPassword', component: ResetPassword },
  { path: '/profile', name: 'UserProfile', component: UserProfile },
  { path: '/materias', name: 'Materias', component: Materias },
  { path: '/materias/create', name: 'CreateMateria', component: CreateMateria },
  { path: '/materias/:id/edit', name: 'EditMateria', component: EditMateria },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;