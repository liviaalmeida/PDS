<template>
  <div></div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapActions } from 'vuex'

export default Vue.extend({
  methods: {
    ...mapActions({
      logout: 'logout',
    })
  },
  async created() {
    this.logout()
    this.$cookies.remove('authToken')
    this.$router.replace('/login')
  },
})
</script>
