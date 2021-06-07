import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cnpj: '',
    fullname: '',
    logged: false,
  },
  mutations: {
    setCNPJ(state) {
      state.cnpj = '82.652.456/0001-09'
    },
    setLogin(state, payload: boolean) {
      state.logged = payload
    },
    setName(state) {
      state.fullname = 'Um grande nome de empresa que não cabe no menu Ltda'
    },
  },
  actions: {
    async login({ commit }) {
      commit('setCNPJ')
      commit('setLogin', true)
      commit('setName')
    },
  },
  getters: {
    cnpj: (state) => state.cnpj,
    fullname: (state) => state.fullname,
    logged: (state) => state.logged,
  },
  modules: {
  },
})
