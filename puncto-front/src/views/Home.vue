<template>
  <div class="home d-flex flex justify-content-center">
    <div class="flex-column justify-content-center">
      <TimeCurrent class="home-header" />
      <PtCalendar v-model="daySelected"
      :fullfilled="[]" :pending="[]" />
    </div>
    <div class="flex-column justify-content-center">
      <div class="home-header">
        <PtButton class="home-button">Registrar Ponto</PtButton>
      </div>
      <div class="home-punchs d-flex flex-column">
        <div class="d-flex flex-row justify-content-between">
          <div class="home-daySelected">{{ daySelectedText }} </div> 
          <div class="d-flex flex-row justify-content-between align-items-center">
            <div class="home-daySelected">{{ hourSelected }} </div>
            <div class="home-tag"></div>
          </div>
        </div>
        <TimeRegistry v-for="punch in punchs"
        :key="punch.id" :punch="punch" />
        <PtButton round @click="onAdd">+</PtButton>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import moment from 'moment'
import TimeCurrent from '../components/time-register/TimeCurrent.vue'
import TimeRegistry from '../components/time-register/TimeRegistry.vue'

moment.locale('pt-br')

export default Vue.extend({
  name: 'Home',
  components: {
    TimeCurrent,
    TimeRegistry,
  },
  data() {
    return {
      daySelected: new Date(),
      hourSelected: '8:45',
      punchs: [
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
          end: '15:25',
          client: 'A Fantástica Fábrica de Chocolate',
          activity: 'Teste da receita secreta'
        }
      ],
    }
  },
  computed: {
    daySelectedText(): string {
      return moment(this.daySelected).format('LL').toLowerCase()
    },
  },
  methods: {
    editPonto() {
      alert('Editar ponto')
    },
    excluirPonto() {
      alert('Excluir ponto')
    },
    onAdd() {
      alert('Adicionar novo Ponto')
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

  &-punchs {
    background: rgba($pt-fog, .5);
    border-radius: 5px;
    gap: 20px;
    padding: 15px;
    width: 580px;  
  }

  &-daySelected {
    font-family: Ubuntu;
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
  }
}
</style>
