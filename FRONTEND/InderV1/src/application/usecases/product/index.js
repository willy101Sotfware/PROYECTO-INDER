export class GetAllProductsUseCase {
  constructor(productRepository) {
    this.productRepository = productRepository
  }

  async execute(filters = {}) {
    return await this.productRepository.getAll(filters)
  }
}

export class CreateProductUseCase {
  constructor(productRepository) {
    this.productRepository = productRepository
  }

  async execute(productData) {
    // Validations
    if (!productData.name || !productData.price) {
      throw new Error('Nombre y precio son requeridos')
    }

    if (productData.price <= 0) {
      throw new Error('El precio debe ser mayor a 0')
    }

    return await this.productRepository.create(productData)
  }
}

export class UpdateProductUseCase {
  constructor(productRepository) {
    this.productRepository = productRepository
  }

  async execute(id, productData) {
    if (!id) {
      throw new Error('ID de producto es requerido')
    }

    return await this.productRepository.update(id, productData)
  }
}

export class DeleteProductUseCase {
  constructor(productRepository) {
    this.productRepository = productRepository
  }

  async execute(id) {
    if (!id) {
      throw new Error('ID de producto es requerido')
    }

    return await this.productRepository.delete(id)
  }
}

export class UpdateProductStockUseCase {
  constructor(productRepository) {
    this.productRepository = productRepository
  }

  async execute(id, quantity) {
    if (!id || quantity === undefined) {
      throw new Error('ID de producto y cantidad son requeridos')
    }

    if (typeof quantity !== 'number') {
      throw new Error('La cantidad debe ser un número')
    }

    return await this.productRepository.updateStock(id, quantity)
  }
}