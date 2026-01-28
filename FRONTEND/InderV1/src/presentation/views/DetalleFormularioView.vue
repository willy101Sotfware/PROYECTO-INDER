<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Barra de navegación -->
    <nav class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <h1 class="text-xl font-bold text-indigo-600">INDER - Detalle Formulario</h1>
            </div>
          </div>
          <div class="flex items-center">
            <router-link
              to="/formularios"
              class="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Volver
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <!-- Contenido principal -->
    <main class="max-w-4xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <div v-if="isLoading" class="flex justify-center py-12">
          <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
        </div>

        <div v-else-if="error" class="bg-white shadow rounded-lg p-6">
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

        <div v-else-if="formulario" class="bg-white shadow rounded-lg overflow-hidden">
          <!-- Encabezado -->
          <div class="bg-gray-50 px-4 py-5 sm:px-6">
            <div class="flex items-center justify-between">
              <div>
                <h3 class="text-lg leading-6 font-medium text-gray-900">
                  Formulario #{{ formulario.id }}
                </h3>
                <p class="mt-1 max-w-2xl text-sm text-gray-500">
                  Creado el {{ new Date(formulario.fechaCreacion).toLocaleDateString() }}
                </p>
              </div>
              <div class="flex space-x-3">
                <button
                  @click="editarFormulario"
                  class="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Editar
                </button>
                <button
                  @click="eliminarFormulario"
                  class="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Eliminar
                </button>
              </div>
            </div>
          </div>

          <!-- Información del formulario -->
          <div class="border-t border-gray-200">
            <dl>
              <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Nombre Completo</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {{ formulario.nombres }} {{ formulario.apellidos }}
                </dd>
              </div>
              
              <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Correo Electrónico</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {{ formulario.correo }}
                </dd>
              </div>
              
              <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Tipo de Documento</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {{ formulario.tipoDocumento?.nombre || formulario.tipoDocumentoId }}
                </dd>
              </div>
              
              <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Número de Documento</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {{ formulario.numeroDocumento }}
                </dd>
              </div>
              
              <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Género</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {{ formulario.genero?.nombre || formulario.generoId }}
                </dd>
              </div>
              
              <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Celular</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {{ formulario.celular }}
                </dd>
              </div>
              
              <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Fecha de Nacimiento</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {{ new Date(formulario.fechaNacimiento).toLocaleDateString() }}
                </dd>
              </div>
              
              <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Edad</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {{ formulario.edad || 'No calculada' }}
                </dd>
              </div>
              
              <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Comuna</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {{ formulario.comuna?.nombreComuna || formulario.comunaId || 'No especificada' }}
                </dd>
              </div>
              
              <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Número de Personas</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {{ formulario.numeroDePeronas || 'No especificado' }}
                </dd>
              </div>
              
              <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Entidad</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {{ formulario.entidad || 'No especificada' }}
                </dd>
              </div>
              
              <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Colegio</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {{ formulario.colegio || 'No especificado' }}
                </dd>
              </div>
              
              <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                <dt class="text-sm font-medium text-gray-500">Dirección</dt>
                <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                  {{ formulario.direccion || 'No especificada' }}
                </dd>
              </div>
            </dl>
          </div>

          <!-- Reservas asociadas -->
          <div v-if="reservasAsociadas.length > 0" class="border-t border-gray-200">
            <div class="bg-white px-4 py-5 sm:px-6">
              <h4 class="text-md font-medium text-gray-900 mb-4">Reservas Asociadas</h4>
              <div class="flow-root">
                <ul class="-mb-8">
                  <li v-for="(reserva, index) in reservasAsociadas" :key="reserva.idReserva">
                    <div class="relative pb-8">
                      <span v-if="index !== reservasAsociadas.length - 1" class="absolute top-4 left-4 -ml-px h-full w-0.5 bg-gray-200" aria-hidden="true"></span>
                      <div class="relative flex space-x-3">
                        <div>
                          <span class="h-8 w-8 rounded-full bg-blue-500 flex items-center justify-center ring-8 ring-white">
                            <svg class="h-5 w-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd" />
                            </svg>
                          </span>
                        </div>
                        <div class="min-w-0 flex-1 pt-1.5 flex justify-between space-x-4">
                          <div>
                            <p class="text-sm text-gray-500">
                              Reserva #{{ reserva.idReserva }} - {{ reserva.sede?.nombreSede || 'Sede no especificada' }}
                            </p>
                            <p class="text-sm text-gray-500 mt-1">
                              {{ new Date(reserva.fechaHoraEntrada).toLocaleString() }}
                            </p>
                            <div class="mt-2 flex flex-wrap gap-1">
                              <span
                                v-for="detalle in reserva.detalles"
                                :key="detalle.idDetalle"
                                class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                              >
                                {{ detalle.servicio?.nombreServicio || 'Servicio desconocido' }}
                              </span>
                            </div>
                          </div>
                          <div class="text-right text-sm whitespace-nowrap text-gray-500">
                            <button
                              @click="verReserva(reserva.idReserva)"
                              class="text-indigo-600 hover:text-indigo-900"
                            >
                              Ver detalles
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useFormularioStore } from '../../application/stores/formularioStore'
import { useReservaStore } from '../../application/stores/reservaStore'

const route = useRoute()
const router = useRouter()
const formularioStore = useFormularioStore()
const reservaStore = useReservaStore()

const formularioId = route.params.id

const isLoading = computed(() => formularioStore.isLoading || reservaStore.isLoading)
const error = computed(() => formularioStore.error || reservaStore.error)
const formulario = computed(() => formularioStore.formularioActual)
const reservasAsociadas = computed(() => 
  reservaStore.reservas.filter(r => r.idFormulario === parseInt(formularioId))
)

const editarFormulario = () => {
  // Implementar edición
  alert('Funcionalidad de edición pendiente')
}

const eliminarFormulario = async () => {
  if (confirm('¿Está seguro de eliminar este formulario?')) {
    try {
      await formularioStore.eliminarFormulario(formularioId)
      router.push('/formularios')
    } catch (error) {
      console.error('Error eliminando formulario:', error)
    }
  }
}

const verReserva = (reservaId) => {
  // Implementar navegación a detalle de reserva
  alert(`Ver detalles de reserva #${reservaId}`)
}

onMounted(async () => {
  try {
    await Promise.all([
      formularioStore.obtenerFormulario(formularioId),
      reservaStore.cargarReservas()
    ])
  } catch (error) {
    console.error('Error cargando detalle del formulario:', error)
  }
})
</script>