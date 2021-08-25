<template>
  <div class="pt-help">
    <PtIcon name="info"
    class="pt-help-icon"
    />
    {{ text }}
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    text: {
      required: true,
      type: String,
    },
  },
})
</script>

<style lang="scss">
.pt-help {
  color: $pt-coal;
  display: flex;
  font-size: 9px;
  line-height: 12px;
  text-align: justify;

  &-icon {
    fill: $pt-coal;
    height: 18px;
    margin-right: 5px;
    min-width: 18px;
    transform: translateY(-2px);
  }
}
</style>
