<template>
  <table class="calendar-pick">
    <thead>
      <tr>
        <th>
          <button @click="offset--">◄</button>
        </th>
        <th></th>
        <th>
          <button @click="offset++">►</button>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(row, index) in years" :key="index">
        <td v-for="year in row" :key="year">
          <button @click="$emit('year', year)">
            {{ year }}
          </button>
        </td>
      </tr>
    </tbody>
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
    start(): number {
      return this.year - (this.year % 16) + (this.offset * 16)
    },
    years(): number[][] {
      return Array.from(
        { length: 4 },
        (_, index) => this.sequence(this.start + index * 3, 3)
      )
    },
  },
  methods: {
    sequence(start: number, length: number) {
      return Array.from(
        { length },
        (_, index) => start + index,
      )
    },
  },
})
</script>
