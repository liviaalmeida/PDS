import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'
import store from '@/store'

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
  {
    path: '/invoices',
    name: 'Invoices',
    component: () => import('@/views/Invoices.vue'),
    meta: {
      auth: true,
    },
  },
  {
    path: '/invoices/setting',
    name: 'Invoices - Configuração',
    component: () => import('@/views/Setting.vue'),
    meta: {
      auth: true,
    },
  },
  {
    path: '/invoices/new',
    name: 'Novo Invoice',
    component: () => import('@/views/Invoice.vue'),
    meta: {
      auth: true,
    },
  },
  {
    path: '/invoice/:id',
    name: 'Invoice',
    component: () => import('@/views/InvoicePrint.vue'),
    meta: {
      auth: true,
    },
  },
  {
    path: '/logout',
    name: 'Logout',
    component: () => import('@/views/Logout.vue'),
  },
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
})

router.beforeEach((to, _, next) => {
  const logged = store.getters['logged']
  if (to.meta?.auth) {
    if (logged) {
      next()
    } else {
      next({
        path: '/login',
        query: {
          redirect: to.fullPath,
        },
      })
    }
  } else if (to.path === '/login' && logged) {
    next({ path: '/' })
  } else {
    next()
  }
})

export default router
