<template>
  <form :class="['time-registry', {
    'time-registry--editing': editing,
  }]" @submit.prevent="confirmEditing">
    <div class="time-registry-header">
      <div class="time-registry-header-times">
        <PtInput small label="Entrada"
        name="start"
        placeholder="HH:MM"
        :mask="'##:##'"
        v-model="model.start"
        :disabled="!editing"
        required />
        <PtInput small label="Saída"
        name="end"
        placeholder="HH:MM"
        :mask="'##:##'"
        v-model="model.end"
        :disabled="!editing" />
      </div>
      <div class="time-registry-header-icons"
      v-if="editing" key="icons-editing">
        <PtButtonIcon icon="check" />
        <PtButtonIcon icon="close" type="button"
        @click="cancelEditing" />
      </div>
      <div class="time-registry-header-icons"
      v-else key="icons-disabled">
        <PtButtonIcon icon="edit" type="button"
        :disabled="!canEdit"
        @click="onEdit" />
        <PtButtonIcon icon="delete" type="button"
        @click="$emit('delete', punch.id)" />
      </div>
    </div>
    <PtInput small label="Cliente" icon="clients"
    required name="client" v-model="model.client"
    :disabled="!editing" />
    <PtInput small label="Atividade" :disabled="!editing"
    name="activity" v-model="model.activity" />
  </form>
</template>

<script lang="ts">
import Vue from 'vue'
import { Punch } from '../../domain/Punch'

export default Vue.extend({
  props: {
    canEdit: {
      required: false,
      type: Boolean,
    },
    onSave: {
      required: true,
      type: Function,
    },
    punch: {
      required: false,
      type: Object as () => Punch,
    },
  },
  data() {
    return {
      editing: this.punch.id === '0',
      model: {
        ...this.punch,
      },
    }
  },
  methods: {
    emitEditing() {
      this.$emit('edit', this.editing)
    },
    cancelEditing() {
      this.editing = false
      this.emitEditing()
      
      if (this.punch.id === '0') {
        this.$emit('delete', this.punch.id)
        return
      }

      this.model = {
        ...this.punch,
      }
    },
    confirmEditing() {
      this.editing = !this.onSave(this.model)
      this.emitEditing()
    },
    onEdit() {
      this.editing = true
      this.emitEditing()
    },
  },
  watch: {
    punch: {
      deep: true,
      handler: function() {
        this.model = {
          ...this.punch,
        }
      },
    },
  },
  mounted() {
    this.emitEditing()
  },
})
</script>

<style lang="scss">
.time-registry {
  border: 1px solid $pt-silver;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 10px;

  &-header {
    display: flex;
    justify-content: space-between;

    &-times {
      display: flex;
      gap: 10px;

      .pt-input {
        width: 60px;
      }
    }

    &-icons {
      display: flex;
      gap: 7px;

      svg {
        height: 15px;
        width: 15px;

        path {
          fill: $pt-silver;
        }
      }
    }
  }

  &--editing {
    border-color: $pt-ocean;

    .time-registry-header-icons svg path {
      fill: $pt-ocean;
    }
  }
}
</style>
