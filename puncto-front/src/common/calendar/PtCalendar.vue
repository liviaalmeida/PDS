<template>
  <div class="calendar">
    <div class="calendar-header">
      <button @click="rollMonth(-1)"
      v-visible="!picking"
      :disabled="picking">
        ◄
      </button>
      <div class="to-test">
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

export type CalendarDate = {
  start: Date
  end?: Date | null
}

type Month = {
  aberto: boolean
  possuiPonto: boolean
  dia: number
}

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
    value: {
      required: true,
      type: Object as () => CalendarDate,
    },
  },
  data() {
    return {
      date: new Date(),
      day: {
        start: this.value.start ? new Date(this.value.start) : undefined,
        end: this.value.end ? new Date(this.value.end) : this.value.end
      },
      fullfilled: [] as number[],
      pending: [] as number[],
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
  watch: {
    date() {
      this.onDate()
    },
  },
  methods: {
    async onDate() {
      const month: Month[] = await this.$api.fetch(this.$api.punch.month(this.date.getMonth()))
      this.fullfilled = month.filter(m => m.possuiPonto && !m.aberto).map(m => m.dia)
      this.pending = month.filter(m => m.aberto).map(m => m.dia)
    },
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
  mounted() {
    this.onDate()
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
