import { API } from '.'
import _Vue from 'vue'

export default {
  install (Vue: typeof _Vue): void {
    Vue.prototype.$api = new API()
  }
}
