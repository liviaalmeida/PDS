<template>
  <div class="time-group d-flex flex-column">
    <div class="d-flex flex-row justify-content-between">
      <div class="time-group-day">{{ dayText }} </div> 
      <div class="d-flex flex-row justify-content-between align-items-center">
        <div class="time-group-day">{{ duration }} </div>
        <div :class="['time-group-tag', {
          'time-group-tag--pending': pending,
        }]"></div>
      </div>
    </div>
    <TimeRegistry v-for="(punch) in model"
    :key="punch.id"
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
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import moment from 'moment'
import TimeRegistry from './TimeRegistry.vue'
import { Punch } from '../../domain/Punch'

moment.locale('pt-br')

export default Vue.extend({
  components: {
    TimeRegistry,
  },
  props: {
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
      model: [] as Punch[],
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
    timeToMoment(time: number) {
      return moment(time)
    },
    updateDuration() {
      if (!this.pending) this.duration = '8:00'
      else if (!this.todaySelected) this.duration = 'Ponto aberto'
      else this.duration = '8:00'
    },
    updateModel() {
      this.model = this.punches.map(p => ({ ...p }))
      this.model.sort(this.sortPunchs)
    },
    validateSave(punch: Punch) {
      if (this.pending && !punch.timestampDateSaida) {
        window.alert('Não é possível deixar mais de um ponto aberto')
        return false
      }

      if (punch.timestampDateSaida &&
        !this.validInterval(punch.timestampDateEntrada, punch.timestampDateSaida)) {
        window.alert('Hora de saída não pode ser menor que hora de entrada')
        return false
      }

      const updated = this.simulatePunches(punch)
      if (!this.validPunchesIntermediates(updated)) {
        window.alert('Apenas o último ponto do dia corrente pode ficar em aberto')
        return false
      }
      if (!this.validPunchesOrder(updated)) {
        window.alert('Você não pode ter uma hora de saída maior que a hora de entrada seguinte')
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
  },
  watch: {
    daySelected() {
      this.updateDuration()
    },
    pending() {
      this.updateDuration()
    },
    punches: {
      deep: true,
      handler: function() {
        this.updateModel()
      },
    },
  },
  mounted() {
    this.updateModel()
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
    border-radius: 50%;
    height: 20px;
    width: 20px;
    margin-left: 10px;

    &--pending {
      background-color: $pt-ruby;
    }
  }
}
</style>
