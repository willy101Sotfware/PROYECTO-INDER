<script setup>
import { RouterView } from 'vue-router'
import { onMounted } from 'vue'
import { useAuthStore } from './application/stores/auth'

const authStore = useAuthStore()

onMounted(() => {
  // Cargar usuario desde localStorage si existe
  authStore.setUserFromStorage()
})
</script>

<template>
  <div class="min-h-screen bg-gray-50">
    <RouterView />
  </div>
</template>

<style scoped>
</style>