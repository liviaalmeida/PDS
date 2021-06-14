<template>
  <div></div>
</template>

<script lang="ts">
import Vue from 'vue'
import { mapGetters } from 'vuex'
import { logout } from '../api'

export default Vue.extend({
  computed: {
    ...mapGetters({
      logged: 'logged',
    })
  },
  async created() {
    if (!this.logged) {
      this.$router.push('/login')
      return
    }
    this.$store.dispatch('loadStart')
    await logout()
      .then(async () => {
        await this.$store.dispatch('logout')
        this.$store.dispatch('loadStop')
        this.$router.push('/login')
      })
      .catch(() => {
        this.$store.dispatch('loadStop')
      })
  },
})
</script>
