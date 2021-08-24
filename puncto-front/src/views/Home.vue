<template>
  <div class="home d-flex flex justify-content-center">
    <div class="flex-column justify-content-center">
      <TimeCurrent class="home-header" />
      <div class="home-calendar" v-if="ready">
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
      <TimeGroup v-if="ready"
      :punches="punches"
      :clients="clients"
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
import { Option } from '../common/input/PtSelect.vue'
import { Month, Punch } from '../domain/Punch'
import { Client } from '../domain/Client'

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
      clients: [] as Option[],
      daySelected: new Date(),
      duration: '',
      editing: false,
      fullfilledPunches: [] as number[],
      pendingPunches: [] as number[],
      punches: [] as Punch[],
      ready: false,
    }
  },
  computed: {
    pending(): boolean {
      return !this.editing && !this.punches.every((punch: Punch) => !!punch.timestampDateSaida)
    },
  },
  methods: {
    async getClients() {
      this.clients = (await this.$api.fetch(this.$api.client.get))
        .map((cl: Client) => ({ payload: cl.id, text: cl.name }))
      this.clients.sort((a, b) => a.text < b.text ? -1 : 1)
    },
    async getPunches() {
      this.punches = []
      this.punches = await this.$api.fetch(this.$api.punch.day(this.daySelected.getTime()))
    },
    async onAdd(now = false) {
      console.log('on add now', this.punches)

      if (!now) {
        this.punches.push(new Punch())
        return
      }

      const current = new Date().getTime()

      if (this.pending) {
        const pendingPunch = {
          ...this.punches.find(p => !p.timestampDateSaida)
        } as Punch

        pendingPunch.timestampDateSaida = current
        await this.onSave(pendingPunch)
      } else {
        this.punches.push(new Punch(current))
      }
    },
    async onCreate(punch: Punch) {
      delete punch.id
      await this.$api.fetch(this.$api.punch.create, punch)
      await this.getPunches()
    },
    async onDelete(id: string) {
      if (id === '0') {
        this.punches = this.punches.filter(pc => pc.id !== id)
        return
      }
      await this.$api.fetch(this.$api.punch.remove(id))
      await this.getPunches()
    },
    async onMonthChange() {
      const month: Month[] = await this.$api.fetch(this.$api.punch.month(this.daySelected.getMonth()))
      this.fullfilledPunches = month.filter(m => m.possuiPonto && !m.aberto).map(m => m.dia)
      this.pendingPunches = month.filter(m => m.aberto).map(m => m.dia)
    },
    async onSave(punch: Punch) {
      await this.$api.fetch(this.$api.punch.save, punch)
      await this.getPunches()
    },
  },
  async mounted() {
    await this.onMonthChange()
    await this.getPunches()
    await this.getClients()
    this.ready = true
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
