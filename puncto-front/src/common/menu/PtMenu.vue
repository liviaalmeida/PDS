<template>
  <nav :class="['menu', { 'menu--open': open }]">
    <div class="menu-header">
      <div class="menu-header-title"
      v-if="open">
        <h2>{{ fullname }}</h2>
        <p>{{ cnpj }}</p>
      </div>
      <button class="menu-header-toggle"
      @click="open = !open">
        <PtIcon :name="icon" :key="icon" />
      </button>
    </div>
    <div class="menu-items menu-primary">
      <MenuItem v-for="item in primary" :key="item.title"
      :icon="item.icon" :link="item.link" :title="item.title"
      :open="open" />
    </div>

    <div class="menu-items menu-secondary">
      <MenuItem v-for="item in secondary" :key="item.title"
      :icon="item.icon" :link="item.link" :title="item.title"
      :open="open" />
    </div>
  </nav>
</template>

<script lang="ts">
import Vue from 'vue'
import MenuItem from './MenuItem.vue'
import { mapGetters } from 'vuex'

type Item = {
  icon: string;
  link: string;
  title: string;
}

export default Vue.extend({
  components: {
    MenuItem,
  },
  data() {
    return {
      open: false,
    }
  },
  computed: {
    icon(): string {
      return this.open ? 'double-chevron-left' : 'double-chevron-right'
    },
    primary(): Item[] {
      return [
        {
          icon: 'watch',
          link: '/',
          title: 'Ponto',
        },
        {
          icon: 'profile',
          link: '/cadastro',
          title: 'Cadastro',
        },
        {
          icon: 'clients',
          link: '/clientes',
          title: 'Clientes',
        },
      ]
    },
    secondary(): Item[] {
      return [
        {
          icon: 'help',
          link: '/ajuda',
          title: 'Ajuda',
        },
        {
          icon: 'logout',
          link: '/logout',
          title: 'Logout',
        },
      ]
    },
    ...mapGetters({
      cnpj: 'cnpj',
      fullname: 'fullname',
    }),
  },
})
</script>

<style lang="scss">
.menu {
  background-color: $pt-sapphire;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100vh;
  padding: 25px 20px;
  transition: width $time;
  width: 75px;

  &-header {
    display: flex;
    align-items: flex-start;
    height: 120px;

    &-title {
      color: white;
      font-family: 'Ubuntu';
      text-align: left;

      h2 {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        font-size: 28px;
        height: 72px;
        line-height: 36px;
        margin-bottom: 25px;
        text-overflow: ellipsis;
        overflow: hidden;
      }

      p {
        font-size: 18px;
        color: rgba($pt-coconut, .8);
      }
    }

    &-toggle {
      border: none;
      background-color: transparent;
      padding: 0;

      svg {
        height: 30px;
        width: 30px;

        path {
          fill: white;
        }
      }
    }
  }

  &-items {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  &-primary {
    margin-bottom: 100px;
  }

  &--open {
    width: 370px;
  }
}
</style>
