import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { directive } from 'v-visible'

import PtButton from '@/components/input/PtButton.vue'
import PtCalendar from '@/components/calendar/PtCalendar.vue'
import PtIcon from '@/components/PtIcon.vue'
import PtInput from '@/components/input/PtInput.vue'
import PtLogo from '@/components/PtLogo.vue'

import '@/assets/scss/reset.scss'
import '@/assets/scss/fonts.scss'

Vue.config.productionTip = false

Vue.directive('visible', directive)

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