<template>
  <div class="calendar">
    <div class="calendar-header">
      <button>{{ month }}</button>
      <button>{{ year }}</button>
    </div>
    <PtMonth :date="date" v-model="value"
    :fullfilled="[11, 12, 13]" :pending="[14]" />
    <PtMonths :months="months" @month="pickMonth" />
    <PtYears :year="year" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import dayjs from 'dayjs'
import PtMonth from './PtMonth.vue'
import PtMonths from './PtMonths.vue'
import PtYears from './PtYears.vue'

export default Vue.extend({
  components: {
    PtMonth,
    PtMonths,
    PtYears,
  },
  model: {

  },
  props: {

  },
  data() {
    return {
      date: new Date(),
      value: new Date(),
    }
  },
  computed: {
    months(): string[] {
      return [
        'Janeiro', 'Fevereiro', 'Março',
        'Abril', 'Maio', 'Junho',
        'Julho', 'Agosto', 'Setembro',
        'Outubro', 'Novembro', 'Dezembro'
      ]
    },
    month(): string {
      return this.months[this.date.getMonth()]
    },
    year(): number {
      return this.date.getFullYear()
    },
  },
  methods: {
    pickMonth(month: number) {
      this.date = dayjs(this.date).month(month).toDate()
    },
  },
})
</script>

<style lang="scss">
.calendar {
  display: inline-block;
  font-family: 'Ubuntu';
  width: 280px;

  button {
    background-color: transparent;
    border: none;
    font-family: 'Ubuntu';
    font-weight: 700;
  }

  &-header {
    display: flex;
    justify-content: space-between;

    button {
      font-size: 20px;
      padding: 0 10px 15px;
    }
  }

  &-pick {
    height: 305px;

    button {
      font-size: 20px;
    }
  }
}
</style>
