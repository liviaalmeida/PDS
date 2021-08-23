<template>
  <div class="client-list d-flex flex-column w-100">
    <PtButton round
    @click="$emit('add')"
    :disabled="editing">
      +
    </PtButton>
    <ClientRegistry
    v-for="client in model"
    :key="client.id"
    :client="client"
    @create="$emit('create', $event)"
    @delete="$emit('delete', $event)"
    @save="$emit('save', $event)"
    @edit="editing = $event" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ClientRegistry from './ClientRegistry.vue'
import { Client } from '../../domain/Client'
import { Utils } from '../../domain/Utils'

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
      editing: false,
      model: this.clients.map(c => ({ ...c })) || [],
    }
  },
  watch: {
    clients() {
      this.model = this.clients.map(c => ({ ...c }))
    },
    query() {
      const norm = Utils.normalize

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
