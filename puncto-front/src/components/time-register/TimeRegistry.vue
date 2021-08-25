<template>
  <form :class="['time-registry', {
    'time-registry--editing': editing,
  }]" @submit.prevent="confirmEditing">
    <div class="time-registry-header">
      <div class="time-registry-header-times">
        <PtInput small label="Entrada"
        name="start"
        placeholder="HH:MM"
        pattern="\d\d:\d\d"
        :mask="'##:##'"
        v-model="lt.start"
        :disabled="!editing"
        required />
        <PtInput small label="Saída"
        name="end"
        placeholder="HH:MM"
        pattern="\d\d:\d\d"
        :mask="'##:##'"
        v-model="lt.end"
        :disabled="!editing" />
      </div>
      <div class="time-registry-header-icons"
      v-if="editing" key="icons-editing">
        <PtButtonIcon icon="check" class="time-registry-save" />
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
    <PtSelect small label="Cliente"
    :options="clients" icon="clients"
    required name="client" v-model="model.clienteId"
    :disabled="!editing" />
    <PtInput small label="Atividade" :disabled="!editing"
    name="activity" v-model="model.descricaoAtividade"
    minLength="4" required />
  </form>
</template>

<script lang="ts">
import Vue from 'vue'
import moment from 'moment'
import { Punch } from '../../domain/Punch'
import { Client } from '../../domain/Client'

export default Vue.extend({
  props: {
    canEdit: {
      required: false,
      type: Boolean,
    },
    clients: {
      required: true,
      type: Array as () => Array<Client>,
    },
    day: {
      required: true,
      type: Date,
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
      lt: {
        start: '',
        end: '',
      },
    }
  },
  computed: {
    timestampLT(): (ts: number) => string {
      return (ts) => ts !== 0 ? moment(ts).format('LT') : ''
    },
    LTtimestamp(): (lt: string) => number | undefined {
      return (lt) => {
        if (lt === '') return
        const [ hour, minute ] = lt.split(':').map(num => Number(num))
        return new Date(new Date(this.day).setHours(hour)).setMinutes(minute)
      }
    },
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
      this.updateLTs()
    },
    confirmEditing() {
      this.updateTimestamps()
      this.editing = !this.onSave(this.model)
      this.emitEditing()
    },
    onEdit() {
      this.editing = true
      this.emitEditing()
    },
    updateLTs() {
      this.lt.start = this.timestampLT(this.punch.timestampDateEntrada || 0)
      this.lt.end = this.timestampLT(this.punch.timestampDateSaida || 0)
    },
    updateTimestamps() {
      this.model.timestampDateEntrada = this.LTtimestamp(this.lt.start)
      this.model.timestampDateSaida = this.LTtimestamp(this.lt.end)
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
    this.updateLTs()
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

      svg path {
        fill: $pt-silver;
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
