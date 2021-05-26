import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import PtIcon from '@/components/PtIcon.vue'
import PtInput from '@/components/input/PtInput.vue'

import '@/assets/scss/reset.scss'
import '@/assets/scss/fonts.scss'

Vue.config.productionTip = false

Vue.component('PtIcon', PtIcon)
Vue.component('PtInput', PtInput)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
