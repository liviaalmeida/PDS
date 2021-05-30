<template>
  <table class="calendar-pick">
    <thead>
      <tr>
        <th>
          <button @click="offset--">◄</button>
        </th>
        <th>
          <button @click="offset++">►</button>
        </th>
      </tr>
    </thead>
  </table>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
  props: {
    year: {
      required: true,
      type: Number,
    },
  },
  data() {
    return {
      offset: 0,
    }
  },
  computed: {
    years() {
      return []
    },
  },
})
</script>
