import httpService from '@/infrastructure/services/HttpService'

export class ReservaRepository {
  async getAll() {
    try {
      const response = await httpService.get('/reservas')
      return response
    } catch (error) {
      throw new Error(error.message || 'Error al obtener reservas')
    }
  }

  async getById(id) {
    try {
      const response = await httpService.get(`/reservas/${id}`)
      return response
    } catch (error) {
      throw new Error(error.message || 'Error al obtener reserva')
    }
  }

  async getByFormulario(formularioId) {
    try {
      const response = await httpService.get(`/reservas/por-formulario/${formularioId}`)
      return response
    } catch (error) {
      throw new Error(error.message || 'Error al obtener reservas del formulario')
    }
  }

  async create(reservaData) {
    try {
      const response = await httpService.post('/reservas', reservaData)
      return response
    } catch (error) {
      throw new Error(error.message || 'Error al crear reserva')
    }
  }

  async validarCupos(validarData) {
    try {
      const response = await httpService.post('/reservas/validar-cupos', validarData)
      return response
    } catch (error) {
      throw new Error(error.message || 'Error al validar cupos')
    }
  }
}

export default new ReservaRepository()