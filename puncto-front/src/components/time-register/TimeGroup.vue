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
    <TimeRegistry v-for="(punch) in data"
    :key="punch.id" :punch="punch"
    :on-save="validateSave"
    :can-edit="!editing"
    @edit="$emit('edit', $event)"
    @delete="onDelete" />
    <PtButton round @click="addPunch"
    :disabled="editing">
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
      data: [] as Punch[],
    }
  },
  computed: {
    dayText(): string {
      return moment(this.day).format('LL').toLowerCase()
    },
    sortPunchs(): (pc1: Punch, pc2: Punch) => number {
      return (pc1: Punch, pc2: Punch) => pc1.start < pc2.start ? -1 : 1
    },
    todaySelected(): boolean {
      return moment(this.day).isSame(moment(), 'day')
    },
  },
  methods: {
    onDelete(id: string) {
      if (id === '0') {
        this.data = this.data.slice(0, -1)
        return
      }

      this.$emit('delete', id)
    },
    addPunch() {
      const newPunch = new Punch()
      newPunch.id = '0'

      this.data = [
        ...this.data,
        newPunch,
      ]
    },
    simulatePunches(punches: Punch[], punch: Punch): Punch[] {
      const index = punches.findIndex(pc => pc.id === punch.id)
      const updated = punches.map((pc, i) => i === index ? { ...punch } : { ...pc})
      updated.sort(this.sortPunchs)
      return updated
    },
    timeToMoment(time: string) {
      const [ hour, minute ] = time.split(':').map(num => Number(num))
      return moment(this.day).hour(hour).minute(minute)
    },
    updateDuration() {
      if (!this.pending) this.duration = '8:00'
      else if (!this.todaySelected) this.duration = 'Ponto aberto'
      else this.duration = '8:00'
    },
    updateData() {
      this.data = this.punches.map(p => ({ ...p }))
      this.data.sort(this.sortPunchs)
    },
    validateSave(punch: Punch) {
      if (this.pending && !punch.end) {
        window.alert('Não é possível deixar mais de um ponto aberto')
        return false
      }

      if (punch.end && !this.validInterval(punch.start, punch.end)) {
        window.alert('Hora de saída não pode ser menor que hora de entrada')
        return false
      }

      const updated = this.simulatePunches(this.data, punch)
      if (!this.validPunchesIntermediates(updated)) {
        window.alert('Apenas o último ponto do dia corrente pode ficar em aberto')
        return false
      }
      if (!this.validPunchesOrder(updated)) {
        window.alert('Você não pode ter uma hora de saída maior que a hora de entrada seguinte')
        return false
      }

      if (punch.id === '0') {
        const newPunch = { ...punch }
        delete newPunch.id
        this.$emit('add', newPunch)
        return true
      }

      this.$emit('save', punch)
      return true
    },
    validInterval(start: string, end: string): boolean {
      return this.timeToMoment(start).isBefore(this.timeToMoment(end))
    },
    validPunchesIntermediates(punches: Punch[]) {
      const checkablePunches = this.todaySelected ? punches.slice(0, -1) : punches
      return checkablePunches.every(punch => !!punch.end)
    },
    validPunchesOrder(punches: Punch[]) {
      return punches.slice(0, -1).every(
        (punch, index) => punch.end && this.validInterval(punch.end, punches[index+1].start)
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
    punches() {
      this.updateData()
    },
  },
  mounted() {
    this.updateData()
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
