<template>
  <table class="month">
    <thead>
      <tr>
        <th v-for="(weekday, index) in weekdays" :key="index"
        class="month-weekday">
          {{ weekday }}
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(week, index) in days" :key="index">
        <td v-for="day in week" :key="dayKey(day)">
          <input type="radio" name="month"
          @input="$emit('select', day)"
          :checked="daySelected(day)"
          :disabled="dayDisabled(day)"
          :id="dayKey(day)">
          <label :for="dayKey(day)">
            {{ day.getDate() }}
          </label>
          <div :class="['month-marker', {
            'month-marker--pending': dayPending(day)
          }]" v-if="dayFullfilled(day) || dayPending(day)">
          </div>
        </td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">
import Vue from 'vue'
import dayjs, { Dayjs } from 'dayjs'

export default Vue.extend({
  model: {
    event: 'select',
  },
  props: {
    date: {
      required: true,
      type: Date,
    },
    fullfilled: {
      required: false,
      type: Array as () => Array<number>,
    },
    pending: {
      required: false,
      type: Array as () => Array<number>,
    },
    value: {
      required: false,
      type: Date,
    },
  },
  computed: {
    days(): Date[][] {
      const first: Dayjs = dayjs(this.date).startOf('month')
      const start = first.subtract(first.day(), 'day')

      return Array.from(
        { length: 6 },
        (_, index) => this.week(start.add(index, 'week').toDate())
      )
    },
    weekdays(): string[] {
      return ['D', 'S', 'T', 'Q', 'Q', 'S', 'S']
    },
  },
  methods: {
    dayDisabled(day: Date) {
      return day.getMonth() !== new Date(this.date).getMonth()
    },
    dayFullfilled(day: Date) {
      return !this.dayDisabled(day) && this.fullfilled?.includes(day.getDate())
    },
    dayKey(day: Date) {
      return `${day.getDate()}-${day.getMonth()}`
    },
    dayPending(day: Date) {
      return !this.dayDisabled(day) && this.pending?.includes(day.getDate())
    },
    daySelected(day: Date) {
      const selected = new Date(this.value)
      return selected.getDate() === day.getDate() &&
        selected.getMonth() === day.getMonth() &&
        selected.getFullYear() === day.getFullYear()
    },
    week(day: Date) {
      return Array.from(
        { length: 7 },
        (_, index) => dayjs(day).add(index, 'day').toDate(),
      )
    },
  },
})
</script>

<style lang="scss">
.month {
  text-align: center;
  height: 305px;

  tr {
    td {
      font-size: 14px;
      padding: 8px 5px;
      position: relative;

      input {
        display: none;
      }

      label {
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 30px;
        width: 30px;
      }

      input:checked ~ label {
        background-color: rgba($pt-sapphire, 0.2);
      }

      input:disabled ~ label {
        color: $pt-silver;
      }
    }

    th {
      font-size: 16px;
      padding-bottom: 10px;
    }
  }

  &-marker {
    background-color: $pt-sapphire;
    border-radius: 50%;
    bottom: 4px;
    left: calc(50% - 2px);
    position: absolute;
    height: 6px;
    width: 6px;
  }
}
</style>
