<template>
  <div class="pt-button">
    <button @click="$('click', $event)">
      <slot name="default"></slot>
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
    help: {
      required: false,
      type: String,
    },
  },
})
</script>

<style lang="scss">
.pt-button {
	display: flex;
	flex-direction: column;
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
}
</style>
