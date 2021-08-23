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
        @click="onAdd(true)">
          Registrar Ponto
        </PtButton>
      </div>
      <TimeGroup :punches="punches"
      :day="daySelected"
      :editing="editing"
      :pending="pending"
      class="home-punches"
      @add="onAdd"
      @create="onCreate"
      @delete="onDelete"
      @save="onSave"
      @edit="editing = $event" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
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
      return !this.editing && !this.punches.every((punch: Punch) => !!punch.timestampDateSaida)
    },
  },
  methods: {
    onAdd(now = false) {
      if (!now) {
        this.punches.push(new Punch())
        return
      }

      const current = new Date().getTime()

      if (this.pending) {
        const last = this.punches.length - 1
        this.punches[last].timestampDateSaida = current
        this.punches[last] = {
          ...this.punches[last]
        }
      } else {
        this.punches.push(new Punch(current))
      }
    },
    onCreate(punch: Punch) {
      window.alert(`create ${punch.timestampDateEntrada} ${punch.timestampDateSaida} ${punch.descricaoAtividade} ${punch.clientId}`)
    },
    onDelete(id: string) {
      if (id === '0') {
        this.punches = this.punches.filter(pc => pc.id !== id)
        return
      }
      alert(`delete ${id}`)
    },
    async onMonthChange() {
      const month: Month[] = await this.$api.fetch(this.$api.punch.month(this.daySelected.getMonth()))
      this.fullfilledPunches = month.filter(m => m.possuiPonto).map(m => m.dia)
      this.pendingPunches = month.filter(m => m.aberto).map(m => m.dia)
    },
    onSave(punch: Punch) {
      window.alert(`save ${punch.id}`)
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
