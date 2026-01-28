import { defineStore } from 'pinia'
import formularioRepository from '../repositories/FormularioRepository'

export const useFormularioStore = defineStore('formulario', {
  state: () => ({
    formularios: [],
    formularioActual: null,
    isLoading: false,
    error: null
  }),

  getters: {
    formularioById: (state) => (id) => {
      return state.formularios.find(f => f.id === id)
    },
    formulariosCount: (state) => state.formularios.length
  },

  actions: {
    async cargarFormularios() {
      this.isLoading = true
      this.error = null
      
      try {
        const data = await formularioRepository.getAll()
        this.formularios = data
        return data
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async obtenerFormulario(id) {
      this.isLoading = true
      this.error = null
      
      try {
        const data = await formularioRepository.getById(id)
        this.formularioActual = data
        return data
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async crearFormulario(formData) {
      this.isLoading = true
      this.error = null
      
      try {
        const data = await formularioRepository.create(formData)
        this.formularios.push(data)
        this.formularioActual = data
        return data
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async actualizarFormulario(id, formData) {
      this.isLoading = true
      this.error = null
      
      try {
        const data = await formularioRepository.update(id, formData)
        const index = this.formularios.findIndex(f => f.id === id)
        if (index !== -1) {
          this.formularios[index] = data
        }
        if (this.formularioActual && this.formularioActual.id === id) {
          this.formularioActual = data
        }
        return data
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async eliminarFormulario(id) {
      this.isLoading = true
      this.error = null
      
      try {
        await formularioRepository.delete(id)
        this.formularios = this.formularios.filter(f => f.id !== id)
        if (this.formularioActual && this.formularioActual.id === id) {
          this.formularioActual = null
        }
        return true
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.isLoading = false
      }
    },

    limpiarFormularioActual() {
      this.formularioActual = null
    },

    limpiarError() {
      this.error = null
    }
  }
})