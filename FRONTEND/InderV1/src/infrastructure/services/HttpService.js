import axios from 'axios'

const API_BASE_URL = import.meta.env.VITE_API_URL || 'https://localhost:7111/api'

class HttpService {
  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    })

    // Request interceptor
    this.client.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token')
        if (token) {
          config.headers.Authorization = `Bearer ${token}`
        }
        return config
      },
      (error) => Promise.reject(error)
    )

    // Response interceptor
    this.client.interceptors.response.use(
      (response) => response.data,
      (error) => {
        if (error.response?.status === 401) {
          localStorage.removeItem('token')
          window.location.href = '/'
        }
        return Promise.reject(error.response?.data || error.message)
      }
    )
  }

  async get(url, config = {}) {
    return this.client.get(url, config)
  }

  async post(url, data = {}, config = {}) {
    return this.client.post(url, data, config)
  }

  async put(url, data = {}, config = {}) {
    return this.client.put(url, data, config)
  }

  async delete(url, config = {}) {
    return this.client.delete(url, config)
  }

  async patch(url, data = {}, config = {}) {
    return this.client.patch(url, data, config)
  }
}

export default new HttpService()