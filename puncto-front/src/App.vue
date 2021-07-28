<template>
  <div id="app">
    <PtLoader v-if="loading" />
    <PtMenu v-if="logged" />
    <div :class="[{
      'view--login': !logged
    }, 'view']">
      <div class="view-header" v-if="logged">
        <PtLogo />
        <h1 class="view-header-title">
          {{ title }}
        </h1>
      </div>
      <router-view class="view-body" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import PtMenu from './common/menu/PtMenu.vue'
import PtLoader from './common/PtLoader.vue'
import { mapGetters } from 'vuex'

export default Vue.extend({
  components: {
    PtMenu,
    PtLoader,
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
    ...mapGetters({
      loading: 'loading',
      logged: 'logged',
    }),
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
    display: flex;
    flex-direction: column;
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
    &-body {
      flex: 1;
    }

    &--login {
      background-image: url('~@/assets/imgs/background.png');
      background-repeat: no-repeat;
      background-size: cover;
    }
  }
}
</style>
