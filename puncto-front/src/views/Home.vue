<template>
  <div class="home d-flex flex justify-content-center">
    <div class="flex-column justify-content-center">
      <TimeCurrent class="home-header" />
      <div class="home-calendar">
        <PtCalendar v-model="daySelected"
        :fullfilled="[]" :pending="[]" />
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
import { Punch } from '../domain/Punch'

export default Vue.extend({
  name: 'Home',
  components: {
    TimeCurrent,
    TimeGroup,
  },
  data() {
    return {
      daySelected: new Date(),
      duration: '',
      editing: false,
      punches: [
        {
          id: '05102012',
          start: '06:40',
          end: '11:30',
          client: 'A Fantástica Fábrica de Chocolate',
          activity: 'Criação da receita secreta'
        },
        {
          id: '05102013',
          start: '12:30',
          end: '14:30',
          client: 'A Fantástica Fábrica de Chocolate',
          activity: 'Teste da receita secreta'
        }
      ] as Punch[],
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
    onSave(punch: Punch) {
      window.alert(`save ${punch.id}`)
    },
    onRegister() {
      window.alert(`register ${moment().format('LT')}`)
    },
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
