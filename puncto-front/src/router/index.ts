import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue'),
  },
  {
    path: '/',
    name: 'Gerenciamento de ponto',
    component: () => import('@/views/Home.vue'),
    meta: {
      auth: true,
    },
  },
  {
    path: '/cadastro',
    name: 'Cadastro',
    component: () => import('@/views/Registration.vue'),
    meta: {
      auth: true,
    },
  },
  {
    path: '/clientes',
    name: 'Clientes',
    component: () => import('@/views/Clients.vue'),
    meta: {
      auth: true,
    },
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router