import { defineStore } from 'pinia'
import catalogoRepository from '../repositories/CatalogoRepository'

export const useCatalogoStore = defineStore('catalogo', {
  state: () => ({
    comunas: [],
    generos: [],
    sedes: [],
    servicios: [],
    tiposDocumento: [],
    isLoading: false,
    error: null
  }),

  getters: {
    comunaById: (state) => (id) => {
      return state.comunas.find(c => c.id === id)
    },
    generoById: (state) => (id) => {
      return state.generos.find(g => g.id === id)
    },
    sedeById: (state) => (id) => {
      return state.sedes.find(s => s.idSede === id)
    },
    servicioById: (state) => (id) => {
      return state.servicios.find(s => s.idServicio === id)
    },
    tipoDocumentoById: (state) => (id) => {
      return state.tiposDocumento.find(t => t.id === id)
    }
  },

  actions: {
    async cargarComunas() {
      this.isLoading = true
      this.error = null
      
      try {
        const data = await catalogoRepository.getComunas()
        this.comunas = data
        return data
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async cargarGeneros() {
      this.isLoading = true
      this.error = null
      
      try {
        const data = await catalogoRepository.getGeneros()
        this.generos = data
        return data
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async cargarSedes() {
      this.isLoading = true
      this.error = null
      
      try {
        const data = await catalogoRepository.getSedes()
        this.sedes = data
        return data
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async cargarServicios() {
      this.isLoading = true
      this.error = null
      
      try {
        const data = await catalogoRepository.getServicios()
        this.servicios = data
        return data
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async cargarTiposDocumento() {
      this.isLoading = true
      this.error = null
      
      try {
        const data = await catalogoRepository.getTiposDocumento()
        this.tiposDocumento = data
        return data
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.isLoading = false
      }
    },

    async cargarTodosLosCatalogos() {
      this.isLoading = true
      this.error = null
      
      try {
        const [comunas, generos, sedes, servicios, tiposDocumento] = await Promise.all([
          this.cargarComunas(),
          this.cargarGeneros(),
          this.cargarSedes(),
          this.cargarServicios(),
          this.cargarTiposDocumento()
        ])
        
        return {
          comunas,
          generos,
          sedes,
          servicios,
          tiposDocumento
        }
      } catch (error) {
        this.error = error.message
        throw error
      } finally {
        this.isLoading = false
      }
    },

    limpiarError() {
      this.error = null
    }
  }
})