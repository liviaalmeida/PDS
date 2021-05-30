<template>
  <div class="calendar">
    <div class="calendar-header">
      <button @click="pickingMonth = !pickingMonth">
        {{ month }}
      </button>
      <button>{{ year }}</button>
    </div>
    <PtMonth :date="date" v-model="value" v-if="!pickingMonth"
    :fullfilled="[new Date(2021, 4, 11), new Date(2021, 4, 12), new Date(2021, 4, 13)]"
    :pending="[new Date(2021, 4, 14)]" />
    <PtMonths :months="months" @month="pickMonth"
    v-if="pickingMonth" />
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
      pickingMonth: false,
      pickingYear: false,
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
      this.pickingMonth = false
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

  table {
    width: 100%;
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

    tbody {
      /* vertical-align: bottom; */
    }
  }
}
</style>
