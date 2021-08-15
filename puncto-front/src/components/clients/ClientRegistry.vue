<template>
  <form :class="['client-registry', 'd-flex', 'flex-column', {
    'client-registry--editing': editing,
  }]" @submit.prevent>
    <div class="client-registry-header"
    v-if="editing" key="icons-editing">
      <PtButtonIcon icon="check" type="submit"
      @click="confirmEditing" />
      <PtButtonIcon icon="close" type="button"
      @click="cancelEditing" />
    </div>
    <div class="client-registry-header"
    v-else key="icons-disabled">
      <PtButtonIcon icon="edit" type="button"
      @click="editing = true" />
      <PtButtonIcon icon="delete" type="button" />
    </div>
    <PtInput small icon="clients"
    label="Cliente" :disabled="!editing"
    v-model="model.name" />
    <PtInput small icon="profile"
    label="Identificador da empresa"
    :disabled="!editing"
    v-model="model.id" />
    <div class="client-registry-address d-flex flex-column">
      <div class="client-registry-address-title">
        Endereço
      </div>
      <PtInput small icon="marker"
      label="Linha 1" :disabled="!editing"
      v-model="model.address" />
      <PtInput small icon="marker"
      label="Linha 2" :disabled="!editing"
      v-model="model.addressTwo" />
      <PtInput small icon="marker"
      label="Linha 3" :disabled="!editing"
      v-model="model.addressThree" />
    </div>
  </form>
</template>

<script lang="ts">
import Vue from 'vue'
import { Client } from '../../domain/Client'

export default Vue.extend({
  props: {
    client: {
      required: true,
      type: Object as () => Client,
    },
  },
  data() {
    return {
      editing: !this.client.id,
      model: { ...this.client },
    }
  },
  methods: {
    emitEditing() {
      this.$emit('edit', this.editing)
    },
    cancelEditing() {
      this.editing = false
      this.emitEditing()

      this.model = {
        ...this.client,
      }
    },
    confirmEditing() {
      this.editing = false
      this.emitEditing()
    },
  },
})
</script>

<style lang="scss">
.client-registry {
  border: 1px solid $pt-silver;
  border-radius: 5px;
  gap: 15px;
  padding: 10px;

  &-header {
    display: flex;
    gap: 7px;
    justify-content: flex-end;

    svg path {
      fill: $pt-silver;
    }
  }

  &-address {
    gap: 15px;

    &-title {
      text-align: left;
      font-size: 12px;
      transform: translateY(5px);
    }
  }

  &--editing {
    border-color: $pt-ocean;

    .client-registry-header svg path {
      fill: $pt-ocean;
    }
  }
}
</style>
