export class LoginUseCase {
  constructor(authRepository) {
    this.authRepository = authRepository
  }

  async execute(credentials) {
    if (!credentials.username || !credentials.password) {
      throw new Error('Nombre de usuario y contraseña son requeridos')
    }

    return await this.authRepository.login(credentials)
  }
}