import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import DashboardView from '../views/DashboardView.vue'
import FormulariosView from '../views/FormulariosView.vue'
import ReservasView from '../views/ReservasView.vue'
import CrearFormularioView from '../views/CrearFormularioView.vue'
import DetalleFormularioView from '../views/DetalleFormularioView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'login',
      component: LoginView
    },
    {
      path: '/dashboard',
      name: 'dashboard',
      component: DashboardView,
      meta: { requiresAuth: true }
    },
    {
      path: '/formularios',
      name: 'formularios',
      component: FormulariosView,
      meta: { requiresAuth: true }
    },
    {
      path: '/formularios/crear',
      name: 'crear-formulario',
      component: CrearFormularioView,
      meta: { requiresAuth: true }
    },
    {
      path: '/formularios/:id',
      name: 'detalle-formulario',
      component: DetalleFormularioView,
      meta: { requiresAuth: true },
      props: true
    },
    {
      path: '/reservas',
      name: 'reservas',
      component: ReservasView,
      meta: { requiresAuth: true }
    }
  ]
})

// Navigation guard for authentication
router.beforeEach((to, from, next) => {
  const isAuthenticated = localStorage.getItem('token')
  
  if (to.meta.requiresAuth && !isAuthenticated) {
    next('/')
  } else if (to.name === 'login' && isAuthenticated) {
    next('/dashboard')
  } else {
    next()
  }
})

export default router