<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Barra de navegación -->
    <nav class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <h1 class="text-xl font-bold text-indigo-600">INDER - Formularios</h1>
            </div>
          </div>
          <div class="flex items-center space-x-4">
            <router-link
              to="/formularios/crear"
              class="px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Nuevo Formulario
            </router-link>
            <router-link
              to="/dashboard"
              class="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Volver
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <!-- Contenido principal -->
    <main class="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <div class="bg-white shadow overflow-hidden sm:rounded-lg">
          <div class="px-4 py-5 sm:px-6">
            <div class="flex justify-between items-center">
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                Lista de Formularios
              </h3>
              <div class="flex items-center space-x-4">
                <div class="relative rounded-md shadow-sm">
                  <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg class="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <input
                    v-model="busqueda"
                    type="text"
                    class="focus:ring-indigo-500 focus:border-indigo-500 block w-full pl-10 pr-12 sm:text-sm border-gray-300 rounded-md"
                    placeholder="Buscar formularios..."
                  />
                </div>
                <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  Total: {{ formulariosFiltrados.length }}
                </span>
              </div>
            </div>
          </div>

          <!-- Tabla de formularios -->
          <div class="border-t border-gray-200">
            <div v-if="isLoading" class="flex justify-center py-12">
              <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
            </div>

            <div v-else-if="error" class="px-6 py-4">
              <div class="rounded-md bg-red-50 p-4">
                <div class="flex">
                  <div class="flex-shrink-0">
                    <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <div class="ml-3">
                    <h3 class="text-sm font-medium text-red-800">
                      {{ error }}
                    </h3>
                  </div>
                </div>
              </div>
            </div>

            <div v-else-if="formulariosFiltrados.length === 0" class="px-6 py-12 text-center">
              <svg class="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              <h3 class="mt-2 text-sm font-medium text-gray-900">No hay formularios</h3>
              <p class="mt-1 text-sm text-gray-500">Empieza creando tu primer formulario.</p>
              <div class="mt-6">
                <router-link
                  to="/formularios/crear"
                  class="inline-flex items-center px-4 py-2 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Crear Formulario
                </router-link>
              </div>
            </div>

            <div v-else class="overflow-x-auto">
              <table class="min-w-full divide-y divide-gray-200">
                <thead class="bg-gray-50">
                  <tr>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      ID
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Nombre Completo
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Documento
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Correo
                    </th>
                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Fecha Creación
                    </th>
                    <th scope="col" class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                      Acciones
                    </th>
                  </tr>
                </thead>
                <tbody class="bg-white divide-y divide-gray-200">
                  <tr v-for="formulario in formulariosFiltrados" :key="formulario.id" class="hover:bg-gray-50">
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                      #{{ formulario.id }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {{ formulario.nombres }} {{ formulario.apellidos }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ formulario.numeroDocumento }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ formulario.correo }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {{ new Date(formulario.fechaCreacion).toLocaleDateString() }}
                    </td>
                    <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <router-link
                        :to="`/formularios/${formulario.id}`"
                        class="text-indigo-600 hover:text-indigo-900 mr-4"
                      >
                        Ver Detalles
                      </router-link>
                      <button
                        @click="eliminarFormulario(formulario.id)"
                        class="text-red-600 hover:text-red-900"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useFormularioStore } from '../../application/stores/formularioStore'

const router = useRouter()
const formularioStore = useFormularioStore()

const busqueda = ref('')

const isLoading = computed(() => formularioStore.isLoading)
const error = computed(() => formularioStore.error)
const formularios = computed(() => formularioStore.formularios)

const formulariosFiltrados = computed(() => {
  if (!busqueda.value) return formularios.value
  
  const termino = busqueda.value.toLowerCase()
  return formularios.value.filter(formulario => 
    formulario.nombres.toLowerCase().includes(termino) ||
    formulario.apellidos.toLowerCase().includes(termino) ||
    formulario.numeroDocumento.toString().includes(termino) ||
    formulario.correo.toLowerCase().includes(termino)
  )
})

const eliminarFormulario = async (id) => {
  if (confirm('¿Está seguro de eliminar este formulario?')) {
    try {
      await formularioStore.eliminarFormulario(id)
    } catch (error) {
      console.error('Error eliminando formulario:', error)
    }
  }
}

onMounted(async () => {
  try {
    await formularioStore.cargarFormularios()
  } catch (error) {
    console.error('Error cargando formularios:', error)
  }
})
</script>