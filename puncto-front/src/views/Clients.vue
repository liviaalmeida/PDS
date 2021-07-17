<template>
  <div class="clients d-flex flex-column justify-content-center align-items-center">
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
    <PtButton class="clients-button">+</PtButton>
    <div v-for="(client) in clients" :key="client.id">
       {{client.name}}
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
          address: 'PSherman, 42, WallabyWay, Sidney'
        },
        {
          name: 'Teste 2',
          id: 'DE813189178',
          address: 'Rua Mauritânia, 385'
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
  },
})
</script>

<style lang="scss">
.clients {
  &-form {
    max-width: 520px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
  }
  &-button {
  width: 15px;
  border-radius: 50%;
  }
}
</style>
