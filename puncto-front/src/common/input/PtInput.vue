<template>
  <div class="d-flex w-100">
    <div :class="['pt-input', {
      'pt-input--disabled': disabled,
      'pt-input--focused': focus,
      'pt-input--input': $attrs.type !== 'textarea',
      'pt-input--small': small,
    }]">
      <label class="pt-input-label">
        <PtIcon :name="icon" v-if="icon" />
        {{ label }}
        <span class="pt-input-label--required"
        v-if="required">
          *
        </span>
      </label>
      <textarea v-if="$attrs.type === 'textarea'"
      :required="required"
      @blur="focus = false" @focus="focus = true"
      @input="$emit('model', $event.target.value)"
      v-bind="$attrs" v-on="$listeners"
      v-model="model"
      :disabled="disabled" />
      <input v-else :required="required"
      @blur="focus = false" @focus="focus = true"
      @input="$emit('model', $event.target.value)"
      v-bind="$attrs" v-on="$listeners"
      v-mask="mask" v-model="model"
      :disabled="disabled" >
    </div>
    <div class="pt-input-help"
    v-if="help">
      <PtIcon name="info"
      class="pt-input-help-icon"
      />
      {{ help }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  model: {
    event: 'model',
  },
  props: {
    disabled: {
      required: false,
      type: Boolean,
    },
    help: {
      required: false,
      type: String,
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
    required: {
      required: false,
      type: Boolean,
    },
    small: {
      required: false,
      type: Boolean,
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
  width: 100%;

  input, textarea {
    background: transparent;
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

    &--required {
      color: $pt-ruby;
    }

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

  &-help {
    color: $pt-coal;
    display: flex;
    font-size: 9px;
    line-height: 12px;
    text-align: justify;
    margin-left: 15px;
    max-width: 200px;
  
    &-icon {
      fill: $pt-coal;
      height: 18px;
      margin-right: 5px;
      min-width: 18px;
      transform: translateY(-2px);
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
    min-height: 40px;
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

    &.pt-input--input {
      height: 40px;
    }

    .pt-input-label {
      font-size: 11px;
      font-weight: 700;
      margin-bottom: 0;
    }

    input, textarea {
      font-size: 13px;
    }
  }
}
</style>
