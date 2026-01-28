import httpService from '../../infrastructure/services/HttpService'
import { AuthRepositoryInterface } from '../../core/interfaces/AuthRepositoryInterface'
import { User } from '../../core/entities/User'

export class AuthRepository extends AuthRepositoryInterface {
  async login(credentials) {
    try {
      console.log('Enviando solicitud de login a:', '/auth/login')
      const response = await httpService.post('/auth/login', credentials)
      console.log('Respuesta del login:', response)
      
      if (!response.token) {
        throw new Error('No se recibió token de autenticación')
      }
      
      return {
        token: response.token,
        user: User.fromApiResponse(response.user)
      }
    } catch (error) {
      console.error('Error en AuthRepository.login:', error)
      throw new Error(error.message || 'Error en el inicio de sesión')
    }
  }

  async register(userData) {
    try {
      const response = await httpService.post('/auth/register', userData)
      return User.fromApiResponse(response)
    } catch (error) {
      throw new Error(error.message || 'Error en el registro')
    }
  }

  async logout() {
    try {
      await httpService.post('/auth/logout')
      localStorage.removeItem('token')
      localStorage.removeItem('user')
    } catch (error) {
      // Even if logout fails, clear local storage
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      throw new Error(error.message || 'Error al cerrar sesión')
    }
  }

  async getCurrentUser() {
    try {
      const response = await httpService.get('/auth/profile')
      return User.fromApiResponse(response)
    } catch (error) {
      throw new Error(error.message || 'Error al obtener perfil')
    }
  }
}