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
    <ClientList
    @add="onAdd"
    @create="onCreate"
    @delete="onDelete"
    @save="onSave"
    :clients="clients"
    :query="clientName" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ClientList from '../components/clients/ClientList.vue'
import { Client } from '../domain/Client'

export default Vue.extend({
  created: function(){
    this.$analytics.logEvent('clients_view')
  },
  components: {
    ClientList,
  },
  data() {
    return {
      clientName: '',
      clients: [] as Client[],
    }
  },
  methods: {
    async getClients() {
      this.clients = []
      this.clients = await this.$api.fetch(this.$api.client.get)
      this.clients.sort((a, b) => a.name < b.name ? -1: 1)
    },
    onAdd(): void {
      this.clients = [
        new Client(),
        ...this.clients,
      ]
    },
    async onCreate(client: Client): Promise<void> {
      delete client.id
      try {
        await this.$api.fetch(this.$api.client.create, client)
        await this.getClients()
      } catch {
        alert('Erro ao criar cliente')
      }
    },
    async onDelete(id: string): Promise<void> {
      if (id === '0') {
        this.clients = this.clients.filter(c => c.id !== id)
        return
      }
      await this.$api.fetch(this.$api.client.remove(id))
      await this.getClients()
    },
    async onSave(client: Client): Promise<void> {
      await this.$api.fetch(this.$api.client.update, client)
      await this.getClients()
    },
    onQuery(): void {
      alert(JSON.stringify(this.clientName))
    },
    onReset(): void {
      this.clientName = ''
    },
  },
  mounted() {
    this.getClients()
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
