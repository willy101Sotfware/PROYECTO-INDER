import { defineStore } from 'pinia'
import reservaRepository from '../repositories/ReservaRepository'

export const useReservaStore = defineStore('reserva', {
  state: () => ({
    reservas: [],
    reservaActual: null,
    isLoading: false,
    error: null
  }),

  getters: {
    reservaById: (state) => (id) => {
      return state.reservas.find(r => r.idReserva === id)
    },
    reservasPorFormulario: (state) => (formularioId) => {
      return state.reservas.filter(r => r.idFormulario === formularioId)
    },
    reservasCount: (state) => state.reservas.length
  },

  actions: {
    async cargarReservas() {
      this.isLoading = true
      this.error = null
      
      try {
        const data = await reservaRepository.getAll()
        this.reservas = data
        return data
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async obtenerReserva(id) {
      this.isLoading = true
      this.error = null
      
      try {
        const data = await reservaRepository.getById(id)
        this.reservaActual = data
        return data
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async obtenerReservasPorFormulario(formularioId) {
      this.isLoading = true
      this.error = null
      
      try {
        const data = await reservaRepository.getByFormulario(formularioId)
        return data
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async crearReserva(reservaData) {
      this.isLoading = true
      this.error = null
      
      try {
        const data = await reservaRepository.create(reservaData)
        this.reservas.push(data)
        this.reservaActual = data
        return data
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async validarCupos(validarData) {
      this.isLoading = true
      this.error = null
      
      try {
        const data = await reservaRepository.validarCupos(validarData)
        return data
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.isLoading = false
      }
    },

    limpiarReservaActual() {
      this.reservaActual = null
    },

    limpiarError() {
      this.error = null
    }
  }
})