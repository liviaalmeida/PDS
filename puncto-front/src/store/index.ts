import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cnpj: '',
    fullname: '',
    loading: false,
    logged: false,
  },
  mutations: {
    setCNPJ(state, payload = '') {
      state.cnpj = payload
    },
    setLoading(state, payload: boolean) {
      state.loading = payload
    },
    setLogin(state, payload: boolean) {
      state.logged = payload
    },
    setName(state, payload = '') {
      state.fullname = payload
    },
  },
  actions: {
    async login({ commit }) {
      commit('setCNPJ', '82.652.456/0001-09')
      commit('setLogin', true)
      commit('setName', 'Um grande nome de empresa que não cabe no menu Ltda')
    },
    async logout({ commit }) {
      commit('setCNPJ')
      commit('setLogin', false)
      commit('setName')
    },
    loadStart({ commit }) {
      commit('setLoading', true)
    },
    loadStop({ commit }) {
      commit('setLoading', false)
    },
  },
  getters: {
    cnpj: (state) => state.cnpj,
    fullname: (state) => state.fullname,
    loading: (state) => state.loading,
    logged: (state) => state.logged,
  },
  modules: {
  },
})
