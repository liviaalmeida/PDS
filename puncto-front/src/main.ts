import Vue from 'vue'
import VueCookies from 'vue-cookies'
import App from './App.vue'
import router from './router'
import store from './store'
import pluginAPI from './api/Plugin'
import VueMask from 'v-mask'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import PtButton from '@/common/input/PtButton.vue'
import PtButtonIcon from '@/common/input/PtButtonIcon.vue'
import PtCalendar from '@/common/calendar/PtCalendar.vue'
import PtIcon from '@/common/PtIcon.vue'
import PtInput from '@/common/input/PtInput.vue'
import PtLogo from '@/common/PtLogo.vue'

import { directive } from 'v-visible'

Vue.use(VueCookies)
Vue.use(pluginAPI)
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueMask)

import '@/assets/scss/reset.scss'
import '@/assets/scss/fonts.scss'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

Vue.component('PtButton', PtButton)
Vue.component('PtButtonIcon', PtButtonIcon)
Vue.component('PtCalendar', PtCalendar)
Vue.component('PtIcon', PtIcon)
Vue.component('PtInput', PtInput)
Vue.component('PtLogo', PtLogo)

Vue.directive('visible', directive)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
