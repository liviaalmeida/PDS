<template>
  <router-link :to="link"
  class="menu-item">
    <PtIcon :name="icon" />
    <span v-if="open">{{ title }}</span>
  </router-link>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    icon: {
      required: true,
      type: String,
    },
    link: {
      required: true,
      type: String,
    },
    open: {
      required: true,
      type: Boolean,
    },
    title: {
      required: true,
      type: String,
    },
  },
})
</script>

<style lang="scss">
.menu-item, .menu-item:visited {
  color: white;
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: 'Ubuntu';
  font-size: 24px;
  height: 30px;
  text-decoration: none;
  opacity: .5;
  transition: opacity $time;

  &:hover, &.router-link-exact-active {
    opacity: 1;
  }

  svg {
    height: 25px;
    width: 25px;

    path {
      fill: white;
    }
  }
}
</style>
