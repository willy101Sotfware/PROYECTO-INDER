export class ProductRepositoryInterface {
  async getAll(filters = {}) {
    throw new Error('Method not implemented')
  }

  async getById(id) {
    throw new Error('Method not implemented')
  }

  async create(productData) {
    throw new Error('Method not implemented')
  }

  async update(id, productData) {
    throw new Error('Method not implemented')
  }

  async delete(id) {
    throw new Error('Method not implemented')
  }

  async updateStock(id, quantity) {
    throw new Error('Method not implemented')
  }
}