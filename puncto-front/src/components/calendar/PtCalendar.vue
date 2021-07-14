<template>
  <div class="calendar">
    <div class="calendar-header">
      <button @click="rollMonth(-1)"
      v-visible="!picking"
      :disabled="picking">
        ◄
      </button>
      <div>
        <button @click="onMonth">
          {{ month }}
        </button>
        <button @click="onYear">
          {{ year }}
        </button>
      </div>
      <button @click="rollMonth(1)"
      v-visible="!picking"
      :disabled="picking">
        ►
      </button>
    </div>
    <PtMonth :date="date" v-model="day"
    @select="$emit('select', $event)"
    v-if="!picking"
    :fullfilled="fullfilled"
    :pending="pending" />
    <PtMonths :months="months" @month="pickMonth"
    v-if="pickingMonth" />
    <PtYears :year="year" @year="pickYear"
    v-if="pickingYear" />
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
    event: 'select',
  },
  props: {
    fullfilled: {
      required: false,
      type: Array,
    },
    pending: {
      required: false,
      type: Array,
    },
    value: {
      required: true,
      type: Date,
    },
  },
  data() {
    return {
      date: new Date(),
      day: new Date(this.value),
      pickingMonth: false,
      pickingYear: false,
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
    picking(): boolean {
      return this.pickingMonth || this.pickingYear
    },
    year(): number {
      return this.date.getFullYear()
    },
  },
  methods: {
    onMonth() {
      this.pickingYear = false
      this.pickingMonth = !this.pickingMonth
    },
    onYear() {
      this.pickingMonth = false
      this.pickingYear = !this.pickingYear
    },
    pickMonth(month: number) {
      this.date = dayjs(this.date).month(month).toDate()
      this.pickingMonth = false
    },
    pickYear(year: number) {
      this.date = dayjs(this.date).year(year).toDate()
      this.pickingYear = false
    },
    rollMonth(offset: number) {
      this.date = dayjs(this.date).add(offset, 'month').toDate()
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
  }
}
</style>
