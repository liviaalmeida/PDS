<template>
  <div class="time-group d-flex flex-column">
    <div class="d-flex flex-row justify-content-between">
      <div class="time-group-day">{{ dayText }} </div> 
      <div class="d-flex flex-row justify-content-between align-items-center">
        <div class="time-group-day">{{ duration }} </div>
        <div :class="['time-group-tag', {
          'time-group-tag--pending': pending,
          'time-group-tag--empty': !punches.length,
        }]"></div>
      </div>
    </div>
    <TimeRegistry v-for="(punch) in punches"
    :key="punch.id"
    :clients="clients"
    :punch="punch"
    :day="day"
    :on-save="validateSave"
    :can-edit="!editing"
    @edit="$emit('edit', $event)"
    @delete="onDelete" />
    <PtButton round @click="onAdd"
    :disabled="editing || pending">
      +
    </PtButton>
    <PtModal v-model="error" :feedback="feedback" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import moment from 'moment'
import TimeRegistry from './TimeRegistry.vue'
import { Punch } from '../../domain/Punch'
import { Client } from '../../domain/Client'
import { Feedback, PunchFeedback } from '../../domain/Feedback'

moment.locale('pt-br')

export default Vue.extend({
  components: {
    TimeRegistry,
  },
  props: {
    clients: {
      required: true,
      type: Array as () => Array<Client>,
    },
    day: {
      required: true,
      type: Date,
    },
    editing: {
      required: true,
      type: Boolean,
    },
    pending: {
      required: true,
      type: Boolean,
    },
    punches: {
      required: true,
      type: Array as () => Array<Punch>,
    },
  },
  data() {
    return {
      duration: '',
      error: false,
      feedback: new Feedback(),
    }
  },
  computed: {
    dayText(): string {
      return moment(this.day).format('LL').toLowerCase()
    },
    sortPunchs(): (pc1: Punch, pc2: Punch) => number {
      return (pc1: Punch, pc2: Punch) =>
        pc1.timestampDateEntrada &&
        pc2.timestampDateEntrada &&
        pc1.timestampDateEntrada < pc2.timestampDateEntrada ?
          -1 : 1
    },
    todaySelected(): boolean {
      return moment(this.day).isSame(moment(), 'day')
    },
  },
  methods: {
    onAdd() {
      this.$emit('add')
    },
    onDelete(id: string) {
      this.$emit('delete', id)
    },
    simulatePunches(punch: Punch): Punch[] {
      const updated = this.punches.map(
        pc => pc.id === punch.id ? { ...punch } : { ...pc}
      )
      updated.sort(this.sortPunchs)
      return updated
    },
    showError(feedback: Feedback): void {
      this.feedback = feedback
      this.error = true
    },
    timeToMoment(time: number): moment.Moment {
      return moment(time)
    },
    updateDuration(): void {
      if (!this.pending) this.duration = Punch.totalDuration(this.punches) || ''
      else if (!this.todaySelected) this.duration = 'Ponto aberto'
      else this.duration = '8:00'
    },
    validateSave(punch: Punch) {
      if (this.pending && !punch.timestampDateSaida) {
        this.showError(PunchFeedback.MultiplePendenciesError)
        return false
      }

      if (punch.timestampDateSaida &&
        !this.validInterval(punch.timestampDateEntrada, punch.timestampDateSaida)) {
        this.showError(PunchFeedback.IntervalError)
        return false
      }

      if ((punch.timestampDateEntrada && !this.validTime(punch.timestampDateEntrada)) ||
        (punch.timestampDateSaida && !this.validTime(punch.timestampDateSaida))) {
        this.showError(PunchFeedback.TimeTravelerError)
        return false
      }

      const updated = this.simulatePunches(punch)
      if (!this.validPunchesIntermediates(updated)) {
        this.showError(PunchFeedback.PastPendencyError)
        return false
      }

      if (!this.validPunchesOrder(updated)) {
        this.showError(PunchFeedback.OverrideError)
        return false
      }

      if (punch.id === '0') {
        delete punch.id
        this.$emit('create', punch)
        return true
      }

      this.$emit('save', punch)
      return true
    },
    validInterval(start?: number, end?: number): boolean {
      return !!start && !!end && this.timeToMoment(start).isBefore(this.timeToMoment(end))
    },
    validPunchesIntermediates(punches: Punch[]) {
      const checkablePunches = this.todaySelected ? punches.slice(0, -1) : punches
      return checkablePunches.every(punch => !!punch.timestampDateSaida)
    },
    validPunchesOrder(punches: Punch[]) {
      return punches.slice(0, -1).every(
        (punch, index) => punch.timestampDateSaida &&
          this.validInterval(
            punch.timestampDateSaida,
            punches[index+1].timestampDateEntrada,
          )
      )
    },
    validTime(time: number): boolean {
      const now = new Date()
      return this.timeToMoment(time).isSameOrBefore(now)
    },
  },
  watch: {
    daySelected() {
      this.updateDuration()
    },
    punches() {
      this.updateDuration()
    }
  },
  mounted() {
    this.updateDuration()
  },
})
</script>

<style lang="scss">
.time-group {
  gap: 20px;
  width: 580px;

  &-day {
    font-family: 'Ubuntu';
    font-weight: bold;
    font-size: 20px;
    align-items: center;
    color: $pt-midnight;
  }

  &-tag {
    background-color: $pt-sapphire;
    border: 1px solid $pt-sapphire;
    border-radius: 50%;
    height: 20px;
    width: 20px;
    margin-left: 10px;

    &--empty {
      background-color: transparent;
    }

    &--pending {
      background-color: $pt-ruby;
      border-color: $pt-ruby;
    }
  }
}
</style>
