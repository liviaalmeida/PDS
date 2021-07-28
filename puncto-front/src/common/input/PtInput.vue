<template>
  <div :class="['pt-input', {
    'pt-input--disabled': disabled,
    'pt-input--focused': focus,
    'pt-input--small': small,
  }]">
    <label class="pt-input-label">
      <PtIcon :name="icon" v-if="icon" />
      {{ label }}
    </label>
    <textarea v-if="type === 'textarea'" :name="name"
		:placeholder="placeholder" :required="required"
    @blur="focus = false" @focus="focus = true"
    @input="$emit('input', $event.target.value)"
    v-bind="inputAttrs" v-model="model"
    :disabled="disabled" />
    <input v-else :type="type" :name="name"
		:placeholder="placeholder" :required="required"
    @blur="focus = false" @focus="focus = true"
    @input="$emit('input', $event.target.value)"
    v-bind="inputAttrs" v-mask="mask" v-model="model"
    :disabled="disabled" >
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  model: {
    event: 'input',
  },
  props: {
    disabled: {
      required: false,
      type: Boolean,
    },
    icon: {
      required: false,
      type: String,
    },
    'input-attrs': {
      required: false,
      type: Object,
    },
    label: {
      required: true,
      type: String,
    },
    mask: {
      required: false,
      type: String,
    },
    name: {
      required: false,
      type: String,
    },
    placeholder: {
      required: false,
      type: String,
    },
    required: {
      required: false,
      type: Boolean,
    },
    small: {
      required: false,
      type: Boolean,
    },
    type: {
      default: 'text',
      required: false,
      type: String,
    },
    value: {
      required: false,
      type: String,
    },
  },
  data() {
    return {
      focus: false,
      model: this.value || '',
    }
  },
  watch: {
    value() {
      this.model = this.value
    },
  },
})
</script>

<style lang="scss">
.pt-input {
  border: 1px solid $pt-midnight;
  border-radius: 5px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 5px;
  text-align: left;
  transition: border-color $time;
  min-height: 50px;

  input, textarea {
    border: none;
    outline: transparent;
    font-family: 'Roboto';
    font-size: 14px;

		&::placeholder {
			color: $pt-coal;
		}
  }

  &-label {
		color: $pt-midnight;
    font-family: 'Ubuntu';
    font-size: 12px;
    transition: color $time;
    margin-bottom: 5px;

    svg {
      height: 10px;
      width: 10px;
      margin: 0 3px 0 0;

			path {
				fill: $pt-midnight;
				transition: fill $time;
			}
    }
  }

  &--disabled {
    background-color: $pt-fog;
    border-color: $pt-coal;

    .pt-input-label {
      color: $pt-coal;

			svg path {
				fill: $pt-coal;
			}
    }
  }

  &--focused {
    border-color: $pt-ocean;

    .pt-input-label {
      color: $pt-ocean;

			svg path {
				fill: $pt-ocean;
			}
    }
  }

  &--small {
    background-color: $pt-coconut;
    border: none;
    min-height: 35px;
    padding: 0 5px;

    &.pt-input--disabled,
    &.pt-input--focused {
      .pt-input-label {
        color: $pt-midnight;
      }

      svg path {
        fill: $pt-midnight;
      }
    }

    &.pt-input--disabled {
      background-color: transparent;

      input {
        background-color: transparent;
      }
    }

    .pt-input-label {
      font-size: 11px;
      font-weight: 700;
      margin-bottom: 0;
    }
  }
}
</style>
