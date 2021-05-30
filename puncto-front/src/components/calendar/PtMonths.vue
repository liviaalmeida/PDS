<template>
  <table class="calendar-pick">
    <tr v-for="(row, index) in short" :key="index">
      <td v-for="month in row" :key="month.index">
        <button @click="$emit('month', month.index)">
          {{ month.month }}
        </button>
      </td>
    </tr>
  </table>
</template>

<script lang="ts">
import Vue from 'vue'

type Month = {
  index: number;
  month: string;
}

export default Vue.extend({
  props: {
    months: {
      required: true,
      type: Array as () => Array<string>,
    },
  },
  computed: {
    short(): Month[][] {
      const months = this.months.map(
        (month, index) => ({ index, month: month.substr(0, 3)})
      )
      return Array.from(
        { length: 4 },
        (_, index) => months.slice(index * 3, index * 3 + 3),
      )
    },
  },
})
</script>
