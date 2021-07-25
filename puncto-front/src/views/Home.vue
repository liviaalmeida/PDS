<template>
  <div class="home d-flex flex-column justify-content-center">
    <div class="home-inicio d-flex flex-row justify-content-around">
      <div class="d-flex flex-column">
        <div class="home-today">{{ today }}</div>
        <div class="home-hour">{{ hour }}</div>
      </div>
      <PtButton class="home-button"> Registrar Ponto </PtButton>
    </div>
    <div class="d-flex flex-row justify-content-around">
      <PtCalendar />
      <div class="home-pontos" >
        <div class="d-flex flex-row justify-content-between">
          <div class="home-daySelected">{{ daySelected }} </div> 
          <div class="d-flex flex-row justify-content-between align-items-center">
            <div class="home-daySelected">{{ hourSelected }} </div>
            <button type="button" class="btn rounded-circle home-tag"></button>
          </div>
        </div>
        <div class="home-ponto" v-for="(ponto) in pontos" :key="ponto.id">
          <div class="d-flex flex-row justify-content-between align-items-center">
            <div class="d-flex flex-row justify-content-between">
              <div class="d-flex flex-column">
                <label class="home-label">
                  Entrada
                </label>
                <div class="home-data">{{ ponto.timestampDateEntrada }}</div>
              </div>
              <div class="d-flex flex-column">
                <label class="home-label">
                  Saída
                </label>
                <div class="home-data">{{ ponto.timestampDateSaida }}</div>
              </div>
            </div>
            <div class="d-flex flex-row justify-content-around"> 
              <div class="hover" v-on:click="editPonto(ponto)"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill icon" viewBox="0 0 16 16">
                  <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708l-3-3zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207l6.5-6.5zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.499.499 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11l.178-.178z"/>
              </svg></div>
              <div class="hover" v-on:click="excluirPonto(ponto)"><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash icon" viewBox="0 0 16 16">
                  <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                  <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
              </svg></div>
            </div>
          </div>
          <div class="d-flex flex-column align-items-start">
            <label class="home-label">
              <PtIcon name="clients"/>
              Cliente
            </label>
            <span class="home-data">{{ ponto.cliente }}</span>
            <label class="home-label">
              Atividade
            </label>
            <span class="home-data">{{ ponto.descricaoAtividade }}</span>
          </div>
        </div>
        <button type="button" class="btn rounded-circle home-add" v-on:click="onAdd()">+</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import moment from 'moment'
import PtCalendar from '../components/calendar/PtCalendar.vue'

moment.locale('pt-br')

export default Vue.extend({
  name: 'Home',
  components: {
    PtCalendar
  },
  data() {
    return {
      today: moment().format('dddd, DD MMMM YYYY'),
      hour: moment().format('LT'),
      daySelected: '18 de maio de 2021',
      hourSelected: '8:45',
      pontos: [
        {
          id: '05102012',
          timestampDateEntrada: '06:40',
          timestampDateSaida: '11:30',
          cliente: 'A Fantástica Fábrica de Chocolate',
          descricaoAtividade: 'Criação da receita secreta'
        },
        {
          id: '05102013',
          timestampDateEntrada: '12:30',
          timestampDateSaida: '15:25',
          cliente: 'A Fantástica Fábrica de Chocolate',
          descricaoAtividade: 'Teste da receita secreta'
        }
      ]
    }
  },
  methods: {
    editPonto(ponto) {
      alert('Editar ponto')
    },
    excluirPonto(ponto) {
      alert('Excluir ponto')
    },
    onAdd() {
      alert('Adicionar novo Ponto')
    }
  }
})
</script>

<style lang="scss">
.home {
  &-inicio {
    margin-bottom: 40px;
  }
  &-today {
    font-family: Roboto;
    font-size: 14px;
    text-align: center;
    color: #000000;
  }
  &-hour {
    font-family: Roboto;
    font-weight: bold;
    font-size: 36px;
    text-align: center;
    color: #000000;
  }
  &-button {
    width: 281px;
  }
  &-pontos {
    width: 580px;  
    background: rgba(237, 237, 237, 0.5);
    border-radius: 5px;
  }
  &-daySelected {
    padding: 10px;
    font-family: Ubuntu;
    font-weight: bold;
    font-size: 20px;
    align-items: center;
    color: #000000;
  }
  &-tag {
    background-color: $pt-sapphire;
    width: 20px;
    height: 20px;
    padding: 10px;
  }
  &-ponto {
    border: 1px solid #C8C8C8;
    box-sizing: border-box;
    border-radius: 5px;
    align-items: right;
    margin: 20px;
  }
  &-label {
    color: $pt-midnight;
    font-family: 'Ubuntu';
    font-weight: bold;
    font-size: 12px;
    transition: color $time;
    margin: 10px 10px 0px 10px;
    svg {
      height: 10px;
      width: 10px;

			path {
				fill: $pt-midnight;
				transition: fill $time;
			}
    }
  }
  &-data {
    font-family: Roboto;
    font-size: 14px;
    color: #000000;
    margin-left: 10px;
  }
  &-add {
    background-color: $pt-sapphire;
    color: $pt-coconut;
    margin: 10px;
  }
}
.icon {
  color: #C8C8C8;
  margin: 10px 10px 10px 0px;
}
.hover {
	cursor: pointer;
}
</style>
