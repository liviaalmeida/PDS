<template>
  <div class="clients d-flex flex-column align-items-center w-100">
    <form
        @submit.prevent="onQuery"
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
    <ClientList :clients="clients"
    :query="clientName" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ClientList from '../components/clients/ClientList.vue'

export default Vue.extend({
  created: function(){
    this.$analytics.logEvent('clients_view')
  },
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
          address: 'PSherman, 42',
          addressTwo: 'WallabyWay',
          addressThree: 'Sydney',
        },
        {
          name: 'Teste 2',
          id: 'DE813189178',
          address: 'Rua Mauritânia, 385',
          addressTwo: 'Bairro Canaã',
          addressThree: 'Belo Horizonte'
        },
      ]
    }
  },
  methods: {
    onAdd: function() {
      alert('Adicionar um novo cliente')
    },
    onQuery(): void {
      alert(JSON.stringify(this.clientName))
    },
    onReset(): void {
      this.clientName = ''
    },
  },
})
</script>

<style lang="scss" scoped>
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
