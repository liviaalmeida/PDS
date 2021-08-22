import API from './api'

declare module 'vue/types/vue' {
  interface Vue {
    $api: API
  }

  interface Vue {
    $analytics: Analytics
  }
}
