<template>
  <div class="clients d-flex flex-column align-items-center w-100">
    <form
        @submit.prevent="onSubmit"
        @reset.prevent="onReset"
        class="clients-query w-100"
      >
      <PtInput
        label="Pesquisar"
        v-model="clientName"
        icon="clients"
        required
        placeholder="Pesquisar pelo nome do cliente"
      />
    </form>
    <ClientList :clients="clients" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ClientList from '../components/clients/ClientList.vue'

export default Vue.extend({
  components: {
    ClientList
  },
  data() {
    return {
      clientName: '',
      clients: [
        {
          name: 'A Fantástica Fábrica de Chocolate',
          id: 'DE813189177',
          address: {
            line1: 'PSherman, 42',
            line2: 'WallabyWay',
            line3: 'Sidney'
          },
        },
        {
          name: 'Teste 2',
          id: 'DE813189178',
          address: {
            line1: 'Rua Mauritânia, 385',
            line2: 'Bairro Canaã',
            line3: 'Belo Horizonte'
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
      this.clientName = ''
    },
    onAdd: function() {
      alert('Adicionar um novo cliente')
    }
  },
})
</script>

<style lang="scss">
.clients {
  max-width: 588px;
  margin: 0 auto;

  &-query {
    display: flex;
    flex-direction: column;
    margin-bottom: 30px;
  }
}
</style>
