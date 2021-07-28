<template>
  <div class="client-list d-flex flex-column w-100">
    <PtButton round>+</PtButton>
    <ClientRegistry v-for="client in clients"
    :key="client.id" :client="client" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import ClientRegistry from './ClientRegistry.vue'
import { Client } from '../../domain/Client'

export default Vue.extend({
  components: {
    ClientRegistry
  },
  props: {
    clients: {
      required: true,
      type: Array as () => Array<Client>,
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
