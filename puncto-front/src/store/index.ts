import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    cnpj: '82.652.456/0001-09',
    fullname: 'Um grande nome de empresa que não cabe no menu Ltda',
    logged: false,
  },
  mutations: {
  },
  actions: {
  },
  getters: {
    cnpj: (state) => state.cnpj,
    fullname: (state) => state.fullname,
    logged: (state) => state.logged,
  },
  modules: {
  },
})
