<template>
  <div id="app">
    <PtMenu />
    <div class="view">
      <!--<div class="view-header">
        <PtLogo />
        <h1 class="view-header-title">
          {{ title }}
        </h1>
      </div>-->
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import PtMenu from './components/menu/PtMenu.vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.use(BootstrapVue)
Vue.use(IconsPlugin)

export default Vue.extend({
  components: {
    //PtMenu,
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
  font-family: 'Roboto', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  height: 100vh;
  display: flex;

  * {
    box-sizing: border-box;
  }

  .view {
    flex: 1;
    overflow: auto;
    //padding: 20px;
    position: absolute;
    width: 100%;
    height: 100%;
    background: url("background.png");

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
