import Vue from 'vue'
import VueCookies from 'vue-cookies'
import App from './App.vue'
import router from './router'
import store from './store'
import pluginAPI from './api/Plugin'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import PtButton from '@/components/input/PtButton.vue'
import PtCalendar from '@/components/calendar/PtCalendar.vue'
import PtIcon from '@/components/PtIcon.vue'
import PtInput from '@/components/input/PtInput.vue'
import PtLogo from '@/components/PtLogo.vue'

Vue.use(VueCookies)
Vue.use(pluginAPI)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

import '@/assets/scss/reset.scss'
import '@/assets/scss/fonts.scss'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

Vue.component('PtButton', PtButton)
Vue.component('PtCalendar', PtCalendar)
Vue.component('PtIcon', PtIcon)
Vue.component('PtInput', PtInput)
Vue.component('PtLogo', PtLogo)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
