<template>
  <div id="app">
    <PtMenu />
    <div class="view">
      <div class="view-header">
        <PtLogo />
        <h1 class="view-header-title">
          {{ title }}
        </h1>
      </div>
      <router-view />
    </div>
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
  computed: {
    title(): string | null | undefined {
      return this.$route.name
    },
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
    padding: 20px;

    &-header {
      display: flex;
      justify-content: space-between;
      align-items: flex-end;
			margin-bottom: 30px;

      &-title {
        color: $pt-sapphire;
        font-family: 'Ubuntu';
        font-size: 28px;
      }
    }
  }
}
</style>
