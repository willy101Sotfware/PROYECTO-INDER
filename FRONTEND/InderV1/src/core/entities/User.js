export class User {
  constructor(data = {}) {
    this.id = data.id || null
    this.username = data.username || ''
    this.email = data.email || ''
    this.role = data.role || 'USER'
    this.isActive = data.isActive ?? true
    this.createdAt = data.createdAt || new Date()
    this.updatedAt = data.updatedAt || new Date()
  }

  static fromApiResponse(data) {
    return new User({
      id: data.id,
      username: data.username,
      email: data.email,
      role: data.role,
      isActive: data.isActive,
      createdAt: new Date(data.createdAt),
      updatedAt: new Date(data.updatedAt)
    })
  }

  toApiRequest() {
    return {
      username: this.username,
      email: this.email,
      role: this.role
    }
  }
}