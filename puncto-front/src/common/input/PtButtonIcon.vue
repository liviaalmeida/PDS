<template>
  <button class="button-icon" :type="type"
  :disabled="disabled"
  @click="$emit('click', $event)">
    <PtIcon :name="icon" />
  </button> 
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    disabled: {
      required: false,
      type: Boolean,
    },
    icon: {
      required: true,
      type: String,
    },
    type: {
      default: 'submit',
      required: false,
      type: String,
    },
  },
})
</script>

<style lang="scss">
.button-icon {
  border: none;
  background-color: transparent;
  height: fit-content;
  padding: 0;

  &:not(:disabled) {
    cursor: pointer;
  }

  svg {
    height: 15px;
    width: 15px;
  }
}
</style>
