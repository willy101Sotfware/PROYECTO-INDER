<template>
  <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
        Sistema de Gestión INDER
      </h2>
      <p class="mt-2 text-center text-sm text-gray-600">
        Ingrese sus credenciales para continuar
      </p>
      <!-- Mensaje de estado del sistema -->
      <div class="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
        <p class="text-center text-sm text-blue-700">
          <strong>Estado:</strong> Conectando a API en https://localhost:7111
        </p>
      </div>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6" @submit.prevent="handleLogin">
          <div>
            <label for="username" class="block text-sm font-medium text-gray-700">
              Usuario
            </label>
            <div class="mt-1">
              <input
                id="username"
                v-model="credentials.username"
                name="username"
                type="text"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Ingrese su nombre de usuario"
              />
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <div class="mt-1">
              <input
                id="password"
                v-model="credentials.password"
                name="password"
                type="password"
                required
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                placeholder="Ingrese su contraseña"
              />
            </div>
          </div>

          <!-- Mensajes de error mejorados -->
          <div v-if="error" class="rounded-md bg-red-50 p-4 border border-red-200">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <h3 class="text-sm font-medium text-red-800">
                  Error de autenticación
                </h3>
                <div class="mt-2 text-sm text-red-700">
                  <p>{{ error }}</p>
                  <p class="mt-1 text-xs">Por favor, verifica tus credenciales e inténtalo nuevamente.</p>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Mensaje de éxito temporal -->
          <div v-if="loginSuccess" class="rounded-md bg-green-50 p-4 border border-green-200">
            <div class="flex">
              <div class="flex-shrink-0">
                <svg class="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                  <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                </svg>
              </div>
              <div class="ml-3">
                <p class="text-sm font-medium text-green-800">
                  ¡Inicio de sesión exitoso! Redirigiendo...
                </p>
              </div>
            </div>
          </div>

          <div>
            <button
              type="submit"
              :disabled="isLoading"
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50"
            >
              <span v-if="isLoading" class="flex items-center">
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Iniciando sesión...
              </span>
              <span v-else>Iniciar Sesión</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../../application/stores/auth'

const router = useRouter()
const authStore = useAuthStore()

const credentials = ref({
  username: '',
  password: ''
})

const error = ref('')
const isLoading = ref(false)
const loginSuccess = ref(false)

const handleLogin = async () => {
  isLoading.value = true
  error.value = ''
  loginSuccess.value = false

  try {
    // Mostrar mensaje de intento
    console.log('.Intentando login con:', credentials.value.username)
    
    const result = await authStore.login(credentials.value)
    
    // Mostrar éxito
    loginSuccess.value = true
    console.log('Login exitoso para:', result.user?.username || 'usuario')
    
    // Esperar un momento para que el usuario vea el mensaje
    setTimeout(() => {
      router.push('/dashboard')
    }, 1500)
    
  } catch (err) {
    console.error('Error en login:', err)
    error.value = err.message || 'Error de autenticación. Por favor verifica tus credenciales.'
    isLoading.value = false
  }
}
</script>