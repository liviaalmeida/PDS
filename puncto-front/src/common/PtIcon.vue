<template>
    <component :is="iconLoader" :class="['icon', name]"
    @click="$emit('click', $event)">
    </component>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    name: {
      type: String,
      required: true,
    },
  },
  computed: {
    iconLoader() {
      return () => import(`@/assets/icons/${this.name}.svg?inline`)
    },
  },
})
</script>
