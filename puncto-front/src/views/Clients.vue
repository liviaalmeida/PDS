<template>
  <div class="clients d-flex flex-column align-items-center">
    <form
        @submit.prevent="onSubmit"
        @reset.prevent="onReset"
        class="clients-form w-100"
      >
      <PtInput
        label="Pesquisar"
        v-model="clientName"
        icon="clients"
        required
        placeholder="Pesquisar pelo nome do cliente"
      />
    </form>
    <div class="clients-list d-flex flex-column align-items-center">
      <button type="button" class="btn rounded-circle clients-button" v-on:click="onAdd">+</button>
      <div class="clients-card" v-for="(client) in clients" :key="client.id">
        <label class="clients-label">
          <PtIcon name="clients"/>
          Cliente
        </label>
        <div class="clients-data">{{ client.name }}</div>
        <label class="clients-label">
          <PtIcon name="profile"/>
          Identificador da Empresa
        </label>
        <div class="clients-data">{{ client.id }}</div>
        <div class="clients-data">Endereço</div>
          <label class="clients-label">
            <PtIcon name="marker"/>
            Linha 1
          </label>
          <div class="clients-data">{{ client.address.linha1 }}</div>
          <label class="clients-label">
            <PtIcon name="marker"/>
            Linha 2
          </label>
          <div class="clients-data">{{ client.address.linha2 }}</div>
          <label class="clients-label">
            <PtIcon name="marker"/>
            Linha 3
          </label>
          <div class="clients-data">{{ client.address.linha3 }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      clientName: '',
      clients: [
        {
          name: 'A Fantástica Fábrica de Chocolate',
          id: 'DE813189177',
          address: {
            linha1: 'PSherman, 42',
            linha2: 'WallabyWay',
            linha3: 'Sidney'
          },
        },
        {
          name: 'Teste 2',
          id: 'DE813189178',
          address: {
            linha1: 'Rua Mauritânia, 385',
            linha2: 'Bairro Canaã',
            linha3: 'Belo Horizonte'
          },
        },
      ]
    }
  },
  methods: {
    onSubmit(): void {
      alert(JSON.stringify(this.clientName))
    },
    onReset(): void {
      this.cleintName = ''
    },
    onAdd: function (event){
      alert('Adicionar um novo cliente')
    }
  },
})
</script>

<style lang="scss">
.clients {
  &-form {
    max-width: 588px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
  }
  &-button {
    background-color: $pt-sapphire;
    color: $pt-coconut;
  }
  &-list {
    margin-top: 20px;
    padding: 15px;
    background-color: #E5E5E5;
    border-radius: 5px 5px 0px 0px;
    width: 588px;
  }
  &-card {
    width: 558px;
    border: 1px solid #76787a;
    box-sizing: border-box;
    border-radius: 5px;
    margin: 10px;
    padding: 15px;
    text-align: left;
  }
  &-label {
    color: $pt-midnight;
    font-family: 'Ubuntu';
    font-size: 12px;
    transition: color $time;
    margin-bottom: 5px;
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
    margin-bottom: 10px;
  }
}
</style>
