<template>
  <div class="pt-select w-100">
    <PtInput
    v-model="query"
    v-bind="$attrs"
    @blur="onBlur"
    @focus="onFocus"
    @input="onQuery"
    />
    <div v-if="open" tabindex="0"
    class="pt-select-options">
      <div v-for="option in filtered"
      :key="option.payload"
      @click="onSelect(option)"
      class="pt-select-option">
        {{ option.text }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Utils } from '../../domain/Utils'

export type Option = {
  payload: string
  text: string
}

export default Vue.extend({
  model: {
    event: 'select',
  },
  props: {
    options: {
      required: true,
      type: Array as () => Array<Option>,
    },
    value: {
      required: false,
      type: String,
    },
  },
  data() {
    return {
      open: false,
      query: '',
    }
  },
  computed: {
    filtered(): Option[] {
      return this.options.filter(
        op => Utils.normalize(op.text).includes(Utils.normalize(this.query))
      )
    },
  },
  methods: {
    onBlur({ relatedTarget }: FocusEvent) {
      if (relatedTarget) {
        const target = relatedTarget as HTMLElement
        if (target.classList.contains('pt-select-options')) return
      }

      this.open = false
      if (this.value !== '') return
      this.query = ''
    },
    onFocus() {
      this.open = true
    },
    onSelect({ payload, text }: Option) {
      this.query = text
      this.$emit('select', payload)
      this.open = false
    },
    onQuery() {
      this.$emit('select', '')
    },
  },
  mounted() {
    if (this.value === '') return
    this.query = this.options.find(op => op.payload === this.value)?.text || ''
  },
})
</script>

<style lang="scss">
$option: 30px;

.pt-select {
  position: relative;

  &-options {
    background-color: white;
    border-bottom-left-radius: 5px;
    border-bottom-right-radius: 5px;
    font-family: 'Ubuntu';
    font-size: 14px;
    max-height: 3 * $option;
    overflow-y: auto;
    position: absolute;
    text-align: left;
    width: 100%;
  }

  &-option {
    cursor: pointer;
    padding: 5px;
    height: $option;

    &:hover {
      background-color: $pt-fog;
    }
  }
}
</style>
