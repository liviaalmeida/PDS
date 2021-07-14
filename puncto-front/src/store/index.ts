import Vue from 'vue'
import Vuex from 'vuex'
import cookie from 'vue-cookies'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cnpj: '',
    email: '',
    fullname: '',
    loading: false,
    // @ts-expect-error access get in server-side
    logged: !!cookie.get('authToken'),
  },
  mutations: {
    setCNPJ(state, payload = '') {
      state.cnpj = payload
    },
    setEmail(state, payload = '') {
      state.email = payload
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
    async login({ commit }, payload: string) {
      commit('setCNPJ', '82.652.456/0001-09')
      commit('setEmail', payload)
      commit('setLogin', true)
      commit('setName', 'Um grande nome de empresa que não cabe no menu Ltda')
    },
    async logout({ commit }) {
      commit('setCNPJ')
      commit('setEmail')
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
    email: (state) => state.email,
    fullname: (state) => state.fullname,
    loading: (state) => state.loading,
    logged: (state) => state.logged,
  },
  modules: {
  },
})
