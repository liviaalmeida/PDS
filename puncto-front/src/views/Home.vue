<template>
  <div class="home d-flex flex justify-content-center">
    <div class="flex-column justify-content-center">
      <TimeCurrent class="home-header" />
      <div class="home-calendar" v-if="ready">
        <PtCalendar v-model="dateSelected" />
      </div>
    </div>
    <div class="flex-column justify-content-center">
      <div class="home-header d-flex justify-content-center">
        <PtButton class="home-button" :disabled="editing"
        @click="onAdd(true)">
          Registrar Ponto
        </PtButton>
      </div>
      <TimeGroup v-if="ready"
      :punches="punches"
      :clients="clients"
      :day="dateSelected.start"
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
import { CalendarDate } from '../common/calendar/PtCalendar.vue'
import { Punch } from '../domain/Punch'
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
      dateSelected: {
        start: new Date(),
        end: null,
      } as CalendarDate,
      duration: '',
      editing: false,
      punches: [] as Punch[],
      ready: false,
    }
  },
  computed: {
    pending(): boolean {
      return !this.editing && !this.punches.every((punch: Punch) => !!punch.timestampDateSaida)
    },
  },
  watch: {
    dateSelected: {
      deep: true,
      handler: async function() {
        await this.getPunches()
      },
    }
  },
  methods: {
    async getClients() {
      this.clients = (await this.$api.fetch(this.$api.client.get))
        .map((cl: Client) => ({ payload: cl.id, text: cl.name }))
      this.clients.sort((a, b) => a.text < b.text ? -1 : 1)
    },
    async getData() {
      this.getPunches()
    },
    async getPunches() {
      this.punches = []
      this.punches = await this.$api.fetch(this.$api.punch.day(this.dateSelected.start?.getTime()))
    },
    async onAdd(now = false) {
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
      await this.getData()
    },
    async onDelete(id: string) {
      if (id === '0') {
        this.punches = this.punches.filter(pc => pc.id !== id)
        return
      }
      await this.$api.fetch(this.$api.punch.remove(id))
      await this.getData()
    },
    async onSave(punch: Punch) {
      await this.$api.fetch(this.$api.punch.save, punch)
      await this.getData()
    },
  },
  async mounted() {
    await this.getData()
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
