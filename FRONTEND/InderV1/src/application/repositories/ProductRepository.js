import httpService from '../../infrastructure/services/HttpService'
import { ProductRepositoryInterface } from '../../core/interfaces/ProductRepositoryInterface'
import { Product } from '../../core/entities/Product'

export class ProductRepository extends ProductRepositoryInterface {
  async getAll(filters = {}) {
    try {
      const response = await httpService.get('/products', { params: filters })
      return response.map(product => Product.fromApiResponse(product))
    } catch (error) {
      throw new Error(error.message || 'Error al obtener productos')
    }
  }

  async getById(id) {
    try {
      const response = await httpService.get(`/products/${id}`)
      return Product.fromApiResponse(response)
    } catch (error) {
      throw new Error(error.message || 'Error al obtener producto')
    }
  }

  async create(productData) {
    try {
      const response = await httpService.post('/products', productData)
      return Product.fromApiResponse(response)
    } catch (error) {
      throw new Error(error.message || 'Error al crear producto')
    }
  }

  async update(id, productData) {
    try {
      const response = await httpService.put(`/products/${id}`, productData)
      return Product.fromApiResponse(response)
    } catch (error) {
      throw new Error(error.message || 'Error al actualizar producto')
    }
  }

  async delete(id) {
    try {
      await httpService.delete(`/products/${id}`)
      return true
    } catch (error) {
      throw new Error(error.message || 'Error al eliminar producto')
    }
  }

  async updateStock(id, quantity) {
    try {
      const response = await httpService.patch(`/products/${id}/stock`, { quantity })
      return Product.fromApiResponse(response)
    } catch (error) {
      throw new Error(error.message || 'Error al actualizar stock')
    }
  }
}