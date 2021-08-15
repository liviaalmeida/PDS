<template>
  <transition name="pt-modal-transition">
    <div class="pt-modal-wrapper" v-if="value">
      <div class="pt-modal">
        <div class="pt-modal-content">
          <PtIcon :name="type"
          class="pt-modal-icon" />
          <p class="pt-modal-title">{{ title }}</p>
          <p class="pt-modal-message">{{ message }}</p>
        </div>
        <button class="pt-modal-close"
        @click="$emit('close', false)">
          Fechar
        </button>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  model: {
    event: 'close',
  },
  props: {
    message: {
      required: true,
      type: String,
    },
    title: {
      required: true,
      type: String,
    },
    type: {
      default: 'info',
      required: false,
      type: String as () => 'info' | 'success' | 'error',
    },
    value: {
      required: true,
      type: Boolean,
    },
  },
})
</script>

<style lang="scss">
.pt-modal {
  background: $pt-coconut;
  border-radius: 5px;
  font-family: 'Roboto';
  width: 450px;

  &-wrapper {
    background: rgba($pt-midnight, .5);
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    width: 100%;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1000;
  }

  &-content {
    padding: 10px;
  }

  &-icon {
    height: 45px;

    &.error path {
      fill: $pt-ruby;
    }

    &.info path {
      fill: $pt-sand;

    }

    &.success path {
      fill: $pt-grass;
    }
  }

  &-title {
    font-size: 14px;
    font-weight: 600;
    margin-bottom: 10px;
    text-transform: uppercase;
  }

  &-message {
    font-size: 13px;
  }

  &-close {
    background: none;
    border: none;
    border-top: 1px solid $pt-silver;
    color: $pt-silver;
    cursor: pointer;
    font-family: 'Roboto';
    padding: 5px;
    text-transform: uppercase;
    width: 100%;
  }

  &-transition {
    &-enter {
      opacity: 0;
    }
  
    &-enter-active {
      transition: .4s;

      .pt-modal {
        animation: grow .4s ease-in 0s 1;
      }
    }
  
    &-leave-to {
      transition: .4s;
      opacity: 0;

      .pt-modal {
        animation: grow .4s ease-out 0s 1 reverse;
      }
    }
  }
}

@keyframes grow {
  0% {
    transform: scale(0);
  }

  100% {
    transform: scale(1);
  }
}
</style>
