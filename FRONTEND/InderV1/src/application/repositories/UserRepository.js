import httpService from '../../infrastructure/services/HttpService'
import { UserRepositoryInterface } from '../../core/interfaces/UserRepositoryInterface'
import { User } from '../../core/entities/User'

export class UserRepository extends UserRepositoryInterface {
  async getAll(filters = {}) {
    try {
      const response = await httpService.get('/users', { params: filters })
      return response.map(user => User.fromApiResponse(user))
    } catch (error) {
      throw new Error(error.message || 'Error al obtener usuarios')
    }
  }

  async getById(id) {
    try {
      const response = await httpService.get(`/users/${id}`)
      return User.fromApiResponse(response)
    } catch (error) {
      throw new Error(error.message || 'Error al obtener usuario')
    }
  }

  async create(userData) {
    try {
      const response = await httpService.post('/users', userData)
      return User.fromApiResponse(response)
    } catch (error) {
      throw new Error(error.message || 'Error al crear usuario')
    }
  }

  async update(id, userData) {
    try {
      const response = await httpService.put(`/users/${id}`, userData)
      return User.fromApiResponse(response)
    } catch (error) {
      throw new Error(error.message || 'Error al actualizar usuario')
    }
  }

  async delete(id) {
    try {
      await httpService.delete(`/users/${id}`)
      return true
    } catch (error) {
      throw new Error(error.message || 'Error al eliminar usuario')
    }
  }
}