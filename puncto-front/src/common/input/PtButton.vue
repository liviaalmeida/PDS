<template>
  <div :class="['pt-button', {
    'pt-button--round': round,
  }]">
    <button @click="$emit('click', $event)"
    :type="type" :disabled="disabled || loading">
      <div class="pt-button-loading"
      v-if="loading">
      </div>
      <slot name="default" v-else>
      </slot>
    </button>
    <div class="pt-button-help"
    v-if="help">
      {{ help }}
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    disabled: {
      required: false,
      type: Boolean,
    },
    help: {
      required: false,
      type: String,
    },
    loading: {
      required: false,
      type: Boolean,
    },
    round: {
      required: false,
      type: Boolean,
    },
    type: {
      default: 'submit',
      required: false,
      type: String,
    },
  },
})
</script>

<style lang="scss">
.pt-button {
  text-align: center;

  button {
    background-color: $pt-sapphire;
    border: none;
    border-radius: 5px;
    color: $pt-coconut;
    font-family: 'Ubuntu';
    font-size: 18px;
    height: 50px;
    padding: 10px 25px;
    width: 100%;

    &:disabled {
      background-color: $pt-silver;
    }
  }

  svg {
    margin: 0 5px;
    height: 14px;
    width: 14px;

    path {
      fill: $pt-coconut;
    }
  }

  &-help {
    color: $pt-coal;
    font-family: 'Roboto';
    font-size: 13px;
    padding-top: 5px;
  }

  &-loading {
    animation: spinner 1.2s cubic-bezier(.91,.04,.87,.57) 0s infinite;
    border: 5px solid rgba($pt-sapphire, .8);
    border-right-color: rgba($pt-silver, .8);
    border-radius: 50%;
    margin: 0 auto;
    height: 25px;
    width: 25px;
  }

  &--round {
    button {
      border-radius: 50%;
      padding: 0;
      height: 35px;
      width: 35px;
    }
  }
}

@keyframes spinner {
  100% { transform: rotate(360deg); }
}
</style>
