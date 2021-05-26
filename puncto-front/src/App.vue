<template>
  <div id="app">
    <PtMenu />
    <router-view class="view" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import PtMenu from './components/menu/PtMenu.vue'

export default Vue.extend({
  components: {
    PtMenu,
  },
  data() {
    return {
      menu: true,
    }
  },
})
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100vh;
  display: flex;

  * {
    box-sizing: border-box;
  }

  .view {
    flex: 1;
    overflow: auto;
  }
}
</style>
