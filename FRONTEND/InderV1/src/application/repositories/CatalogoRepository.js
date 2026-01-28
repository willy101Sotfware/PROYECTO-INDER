import httpService from '@/infrastructure/services/HttpService'

export class CatalogoRepository {
  // Comunas
  async getComunas() {
    try {
      const response = await httpService.get('/comunas')
      return response
    } catch (error) {
      throw new Error(error.message || 'Error al obtener comunas')
    }
  }

  // Géneros
  async getGeneros() {
    try {
      const response = await httpService.get('/generos')
      return response
    } catch (error) {
      throw new Error(error.message || 'Error al obtener géneros')
    }
  }

  // Sedes
  async getSedes() {
    try {
      const response = await httpService.get('/sedes')
      return response
    } catch (error) {
      throw new Error(error.message || 'Error al obtener sedes')
    }
  }

  // Servicios
  async getServicios() {
    try {
      const response = await httpService.get('/servicios')
      return response
    } catch (error) {
      throw new Error(error.message || 'Error al obtener servicios')
    }
  }

  // Tipos de Documento
  async getTiposDocumento() {
    try {
      const response = await httpService.get('/tiposdocumento')
      return response
    } catch (error) {
      throw new Error(error.message || 'Error al obtener tipos de documento')
    }
  }
}

export default new CatalogoRepository()