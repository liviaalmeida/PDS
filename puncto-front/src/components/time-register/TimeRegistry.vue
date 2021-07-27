<template>
  <div :class="['time-registry', {
    'time-registry--editing': editing,
  }]">
    <div class="time-registry-header">
      <div class="time-registry-header-times">
        <PtInput small label="Entrada"
        placeholder="HH:MM"
        :mask="'##:##'"
        v-model="model.start"
        :disabled="!editing"
        required />
        <PtInput small label="Saída"
        placeholder="HH:MM"
        :mask="'##:##'"
        v-model="model.end"
        :disabled="!editing" />
      </div>
      <div class="time-registry-header-icons"
      v-if="editing" key="icons-editing">
        <PtIcon name="check"
        @click="confirmEditing" />
        <PtIcon name="close"
        @click="cancelEditing" />
      </div>
      <div class="time-registry-header-icons"
      v-else key="icons-disabled">
        <PtIcon name="edit"
        @click="editing = true" />
        <PtIcon name="delete"
        @click="$emit('delete', punch.id)" />
      </div>
    </div>
    <PtInput small label="Cliente" icon="clients"
    required v-model="model.client"
    :disabled="!editing" />
    <PtInput small label="Atividade"
    v-model="model.activity"
    :disabled="!editing" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Punch } from '../../domain/Punch'

export default Vue.extend({
  props: {
    punch: {
      required: false,
      type: Object as () => Punch,
    },
  },
  data() {
    return {
      editing: false,
      model: {
        ...this.punch,
      },
    }
  },
  methods: {
    cancelEditing() {
      this.editing = false
      this.model = {
        ...this.punch,
      }
    },
    confirmEditing() {
      this.editing = false
      this.$emit('save', this.model)
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
        cursor: pointer;
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
