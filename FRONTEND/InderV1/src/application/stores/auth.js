import { defineStore } from 'pinia'
import { AuthRepository } from '../application/repositories/AuthRepository'
import { LoginUseCase } from '../application/usecases/auth/LoginUseCase'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
    isLoading: false,
    error: null
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    currentUser: (state) => state.user
  },

  actions: {
    async login(credentials) {
      this.isLoading = true
      this.error = null
      
      try {
        const authRepository = new AuthRepository()
        const loginUseCase = new LoginUseCase(authRepository)
        
        const result = await loginUseCase.execute(credentials)
        
        this.token = result.token
        this.user = result.user
        this.error = null
        
        return result
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async logout() {
      try {
        const authRepository = new AuthRepository()
        await authRepository.logout()
      } catch (error) {
        console.error('Error during logout:', error)
      } finally {
        this.user = null
        this.token = null
      }
    },

    setUserFromStorage() {
      const storedUser = localStorage.getItem('user')
      if (storedUser && this.token) {
        this.user = JSON.parse(storedUser)
      }
    }
  }
})