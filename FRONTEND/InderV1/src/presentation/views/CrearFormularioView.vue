<template>
  <div class="min-h-screen bg-gray-100">
    <!-- Barra de navegación -->
    <nav class="bg-white shadow">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="flex justify-between h-16">
          <div class="flex">
            <div class="flex-shrink-0 flex items-center">
              <h1 class="text-xl font-bold text-indigo-600">INDER - Nuevo Formulario</h1>
            </div>
          </div>
          <div class="flex items-center">
            <router-link
              to="/formularios"
              class="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
            >
              Cancelar
            </router-link>
          </div>
        </div>
      </div>
    </nav>

    <!-- Contenido principal -->
    <main class="max-w-3xl mx-auto py-6 sm:px-6 lg:px-8">
      <div class="px-4 py-6 sm:px-0">
        <div class="bg-white shadow sm:rounded-lg">
          <div class="px-4 py-5 sm:p-6">
            <h3 class="text-lg leading-6 font-medium text-gray-900 mb-6">
              Crear Nuevo Formulario
            </h3>

            <form @submit.prevent="handleSubmit" class="space-y-6">
              <!-- Datos Personales -->
              <div>
                <h4 class="text-md font-medium text-gray-700 mb-4">Datos Personales</h4>
                
                <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label class="block text-sm font-medium text-gray-700">Nombres *</label>
                    <input
                      v-model="formData.nombres"
                      type="text"
                      required
                      class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700">Apellidos *</label>
                    <input
                      v-model="formData.apellidos"
                      type="text"
                      required
                      class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700">Correo *</label>
                    <input
                      v-model="formData.correo"
                      type="email"
                      required
                      class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700">Celular *</label>
                    <input
                      v-model="formData.celular"
                      type="tel"
                      required
                      class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>

              <!-- Información Adicional -->
              <div>
                <h4 class="text-md font-medium text-gray-700 mb-4">Información Adicional</h4>
                
                <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <div>
                    <label class="block text-sm font-medium text-gray-700">Dirección</label>
                    <input
                      v-model="formData.direccion"
                      type="text"
                      class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                  
                  <div>
                    <label class="block text-sm font-medium text-gray-700">Fecha de Nacimiento *</label>
                    <input
                      v-model="formData.fechaNacimiento"
                      type="date"
                      required
                      class="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                    />
                  </div>
                </div>
              </div>

              <!-- Mensajes de estado -->
              <div v-if="error" class="rounded-md bg-red-50 p-4">
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

              <div v-if="success" class="rounded-md bg-green-50 p-4">
                <div class="flex">
                  <div class="flex-shrink-0">
                    <svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                    </svg>
                  </div>
                  <div class="ml-3">
                    <p class="text-sm font-medium text-green-800">
                      Formulario creado exitosamente
                    </p>
                  </div>
                </div>
              </div>

              <!-- Botones de acción -->
              <div class="flex justify-end space-x-3">
                <button
                  type="button"
                  @click="$router.back()"
                  class="px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  :disabled="isLoading"
                  class="px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
                >
                  <span v-if="isLoading" class="flex items-center">
                    <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                      <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Guardando...
                  </span>
                  <span v-else>Guardar Formulario</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useFormularioStore } from '../../application/stores/formularioStore'

const router = useRouter()
const formularioStore = useFormularioStore()

const formData = reactive({
  nombres: '',
  apellidos: '',
  correo: '',
  direccion: '',
  celular: '',
  fechaNacimiento: '',
  tipoDocumentoId: 1, // Valor por defecto
  numeroDocumento: '',
  generoId: 1, // Valor por defecto
  comunaId: null,
  numeroDePeronas: null,
  entidad: '',
  colegio: ''
})

const isLoading = ref(false)
const error = ref('')
const success = ref(false)

const handleSubmit = async () => {
  isLoading.value = true
  error.value = ''
  success.value = false

  try {
    // Validaciones básicas
    if (!formData.nombres || !formData.apellidos || !formData.correo || !formData.celular || !formData.fechaNacimiento) {
      throw new Error('Por favor complete todos los campos obligatorios')
    }

    // Validar formato de correo
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.correo)) {
      throw new Error('Por favor ingrese un correo válido')
    }

    await formularioStore.crearFormulario(formData)
    success.value = true
    
    // Redirigir después de 2 segundos
    setTimeout(() => {
      router.push('/formularios')
    }, 2000)

  } catch (err) {
    error.value = err.message || 'Error al crear el formulario'
  } finally {
    isLoading.value = false
  }
}
</script>