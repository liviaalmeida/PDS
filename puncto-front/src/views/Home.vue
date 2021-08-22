<template>
  <div class="home d-flex flex justify-content-center">
    <div class="flex-column justify-content-center">
      <TimeCurrent class="home-header" />
      <div class="home-calendar">
        <PtCalendar v-model="daySelected"
        :fullfilled="fullfilledPunches"
        :pending="pendingPunches" />
      </div>
    </div>
    <div class="flex-column justify-content-center">
      <div class="home-header">
        <PtButton class="home-button" :disabled="editing"
        @click="onRegister">
          Registrar Ponto
        </PtButton>
      </div>
      <TimeGroup :punches="punches"
      :day="daySelected"
      :editing="editing"
      :pending="pending"
      class="home-punches"
      @add="onAdd"
      @delete="onDelete"
      @edit="editing = $event"
      @save="onSave" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import moment from 'moment'
import TimeCurrent from '../components/time-register/TimeCurrent.vue'
import TimeGroup from '../components/time-register/TimeGroup.vue'
import { Month, Punch } from '../domain/Punch'

export default Vue.extend({
  name: 'Home',
  created: function(){
    this.$analytics.logEvent('home_view')
  },
  components: {
    TimeCurrent,
    TimeGroup,
  },
  data() {
    return {
      daySelected: new Date(),
      duration: '',
      editing: false,
      fullfilledPunches: [] as number[],
      pendingPunches: [] as number[],
      punches: [] as Punch[],
    }
  },
  computed: {
    pending(): boolean {
      return !this.editing && !this.punches.every((punch: Punch) => !!punch.end)
    },
  },
  methods: {
    onAdd(punch: Punch) {
      window.alert(`add ${punch.start} ${punch.end}`)
    },
    onDelete(id: string) {
      window.alert(`delete ${id}`)
    },
    async onMonthChange() {
      const month: Month[] = await this.$api.fetch(this.$api.punch.month(this.daySelected.getMonth()))
      this.fullfilledPunches = month.filter(m => m.possuiPonto).map(m => m.dia)
      this.pendingPunches = month.filter(m => m.aberto).map(m => m.dia)
    },
    onSave(punch: Punch) {
      window.alert(`save ${punch.id}`)
    },
    onRegister() {
      const now = moment().format('hh:mm')

      if (this.pending) {
        const last = this.punches.length - 1
        this.punches[last].end = now
        this.punches[last] = {
          ...this.punches[last]
        }
      } else {
        this.punches.push(new Punch(now))
      }
    },
  },
  mounted() {
    this.onMonthChange()
  },
})
</script>

<style lang="scss">
.home {
  gap: 50px;

  &-header {
    height: 130px;
  }

  &-button {
    padding-top: 15px;
    width: 281px;
  }

  &-calendar, &-punches {
    background: rgba($pt-fog, .5);
    border-radius: 5px;
    padding: 15px;
  }
}
</style>
