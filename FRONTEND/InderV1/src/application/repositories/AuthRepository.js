import httpService from '../../infrastructure/services/HttpService'
import { AuthRepositoryInterface } from '../../core/interfaces/AuthRepositoryInterface'
import { User } from '../../core/entities/User'

export class AuthRepository extends AuthRepositoryInterface {
  async login(credentials) {
    try {
      const response = await httpService.post('/auth/login', credentials)
      if (response.token) {
        localStorage.setItem('token', response.token)
        localStorage.setItem('user', JSON.stringify(response.user))
      }
      return {
        token: response.token,
        user: User.fromApiResponse(response.user)
      }
    } catch (error) {
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