<template>
  <div :class="['pt-input', {
    'pt-input--disabled': disabled,
    'pt-input--focused': focus,
  }]">
    <label class="pt-input-label">
      <PtIcon :name="icon" v-if="icon" />
      {{ label }}
    </label>
    <textarea v-if="type === 'textarea'" :value="value" :name="name"
		:placeholder="placeholder" :required="required"
    @blur="focus = false" @focus="focus = true"
    @input="$emit('input', $event.target.value)" />
    <input v-else :type="type" :value="value" :name="name"
		:placeholder="placeholder" :required="required"
    @blur="focus = false" @focus="focus = true"
    @input="$emit('input', $event.target.value)">
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
    }
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
			transition: fill $time;

			path {
				fill: $pt-midnight;
				transition: fill $time;
			}
    }
  }

  &--focused {
    border-color: $pt-ocean;

    .pt-input-label {
      color: $pt-ocean;

			svg, svg path {
				fill: $pt-ocean;
			}
    }
  }
}
</style>
