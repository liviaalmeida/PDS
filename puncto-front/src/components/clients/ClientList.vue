<template>
  <div class="client-list d-flex flex-column w-100">
    <PtButton round @click="onAdd">
      +
    </PtButton>
    <ClientRegistry v-for="client in model"
    :key="client.id" :client="client" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ClientRegistry from './ClientRegistry.vue'
import { Client } from '../../domain/Client'

export default Vue.extend({
  components: {
    ClientRegistry,
  },
  props: {
    clients: {
      required: true,
      type: Array as () => Array<Client>,
    },
    query: {
      required: false,
      type: String,
    },
  },
  data() {
    return {
      model: this.clients.map(c => ({ ...c })) || [],
    }
  },
  computed: {
    normalize(): (str: string) => string {
      return (str: string) => str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
    },
  },
  methods: {
    onAdd() {
      const client = new Client()
      this.model = [
        client,
        ...this.model,
      ]
    },
  },
  watch: {
    clients() {
      this.model = this.clients.map(c => ({ ...c }))
    },
    query() {
      const norm = this.normalize

      this.model = this.clients
        .filter(client => norm(client.name).includes(norm(this.query)))
        .map(c => ({ ...c }))
    },
  },
})
</script>

<style lang="scss">
.client-list {
  background-color: rgba($pt-fog, .5);
  border-radius: 5px;
  gap: 20px;
  padding: 15px;
}
</style>
