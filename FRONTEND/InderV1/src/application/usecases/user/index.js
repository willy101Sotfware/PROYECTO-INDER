export class GetAllUsersUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository
  }

  async execute(filters = {}) {
    return await this.userRepository.getAll(filters)
  }
}

export class CreateUserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository
  }

  async execute(userData) {
    // Validations
    if (!userData.username || !userData.email) {
      throw new Error('Nombre de usuario y email son requeridos')
    }

    if (!userData.password || userData.password.length < 6) {
      throw new Error('La contraseña debe tener al menos 6 caracteres')
    }

    return await this.userRepository.create(userData)
  }
}

export class UpdateUserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository
  }

  async execute(id, userData) {
    if (!id) {
      throw new Error('ID de usuario es requerido')
    }

    return await this.userRepository.update(id, userData)
  }
}

export class DeleteUserUseCase {
  constructor(userRepository) {
    this.userRepository = userRepository
  }

  async execute(id) {
    if (!id) {
      throw new Error('ID de usuario es requerido')
    }

    return await this.userRepository.delete(id)
  }
}