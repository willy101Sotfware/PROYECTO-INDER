import httpService from '@/infrastructure/services/HttpService'

export class FormularioRepository {
  async getAll() {
    try {
      const response = await httpService.get('/formularios')
      return response
    } catch (error) {
      throw new Error(error.message || 'Error al obtener formularios')
    }
  }

  async getById(id) {
    try {
      const response = await httpService.get(`/formularios/${id}`)
      return response
    } catch (error) {
      throw new Error(error.message || 'Error al obtener formulario')
    }
  }

  async create(formData) {
    try {
      const response = await httpService.post('/formularios', formData)
      return response
    } catch (error) {
      throw new Error(error.message || 'Error al crear formulario')
    }
  }

  async update(id, formData) {
    try {
      const response = await httpService.put(`/formularios/${id}`, formData)
      return response
    } catch (error) {
      throw new Error(error.message || 'Error al actualizar formulario')
    }
  }

  async delete(id) {
    try {
      const response = await httpService.delete(`/formularios/${id}`)
      return response
    } catch (error) {
      throw new Error(error.message || 'Error al eliminar formulario')
    }
  }
}

export default new FormularioRepository()