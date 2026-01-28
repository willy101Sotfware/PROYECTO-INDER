<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Barra de navegación -->
    <nav class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <h1 class="text-xl font-bold text-indigo-600">INDER</h1>
            </div>
            <div class="hidden sm:ml-6 sm:flex sm:space-x-8">
              <router-link
                to="/dashboard"
                class="border-indigo-500 text-gray-900 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Dashboard
              </router-link>
              <router-link
                to="/formularios"
                class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Formularios
              </router-link>
              <router-link
                to="/reservas"
                class="border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium"
              >
                Reservas
              </router-link>
            </div>
          </div>
          <div class="flex items-center">
            <button
              @click="handleLogout"
              class="ml-4 px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Contenido principal -->
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <div class="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
          <div class="text-center">
            <h2 class="text-2xl font-bold text-gray-900 mb-4">Dashboard Principal</h2>
            <p class="text-gray-600 mb-6">Bienvenido al Sistema de Gestión INDER</p>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div class="bg-white rounded-lg shadow p-6">
                <h3 class="text-lg font-medium text-gray-900 mb-2">Formularios</h3>
                <p class="text-3xl font-bold text-indigo-600">{{ estadisticas.formularios }}</p>
                <p class="text-sm text-gray-500 mt-1">Total registrados</p>
                <router-link 
                  to="/formularios" 
                  class="mt-4 inline-block text-indigo-600 hover:text-indigo-500 text-sm font-medium"
                >
                  Ver todos →
                </router-link>
              </div>
              
              <div class="bg-white rounded-lg shadow p-6">
                <h3 class="text-lg font-medium text-gray-900 mb-2">Reservas</h3>
                <p class="text-3xl font-bold text-green-600">{{ estadisticas.reservas }}</p>
                <p class="text-sm text-gray-500 mt-1">Activas</p>
                <router-link 
                  to="/reservas" 
                  class="mt-4 inline-block text-indigo-600 hover:text-indigo-500 text-sm font-medium"
                >
                  Ver todas →
                </router-link>
              </div>
              
              <div class="bg-white rounded-lg shadow p-6">
                <h3 class="text-lg font-medium text-gray-900 mb-2">Sedes</h3>
                <p class="text-3xl font-bold text-purple-600">{{ estadisticas.sedes }}</p>
                <p class="text-sm text-gray-500 mt-1">Operativas</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../application/stores/auth'
import { useFormularioStore } from '../../application/stores/formularioStore'
import { useReservaStore } from '../../application/stores/reservaStore'
import { useCatalogoStore } from '../../application/stores/catalogoStore'

const router = useRouter()
const authStore = useAuthStore()
const formularioStore = useFormularioStore()
const reservaStore = useReservaStore()
const catalogoStore = useCatalogoStore()

const estadisticas = ref({
  formularios: 0,
  reservas: 0,
  sedes: 0
})

const handleLogout = () => {
  authStore.logout()
  router.push('/')
}

onMounted(async () => {
  try {
    // Cargar datos iniciales
    await Promise.all([
      formularioStore.cargarFormularios(),
      reservaStore.cargarReservas(),
      catalogoStore.cargarSedes()
    ])
    
    // Actualizar estadísticas
    estadisticas.value = {
      formularios: formularioStore.formulariosCount,
      reservas: reservaStore.reservasCount,
      sedes: catalogoStore.sedes.length
    }
  } catch (error) {
    console.error('Error cargando datos del dashboard:', error)
  }
})
</script>