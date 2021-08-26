<template>
  <div class="company">
    <div class="company-title">
      {{ title }}
    </div>
    <div class="company-data">
      <div class="company-name">
        {{ company.name }}
      </div>
      <div class="company-address">
        {{ company.address }}<br>
        {{ company.addressTwo }}<br>
        {{ company.addressThree }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    company: {
      required: true,
      type: Object,
    },
    title: {
      required: true,
      type: String,
    },
  },
})
</script>

<style lang="scss">
.company {
  text-align: left;

  &-data {
    font-family: 'Ubuntu';
    margin-top: 8px;
  }

  &-name {
    font-weight: bold;
  }

  &-address {
    font-size: 14px;
    margin-top: 5px;
  }
}
</style>
