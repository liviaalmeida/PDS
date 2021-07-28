<template>
  <div class="time-current">
    <div class="time-current-day">
      {{ day }}
    </div>
    <div class="time-current-time">
      {{ time }}
    </div>
  </div> 
</template>

<script lang="ts">
import Vue from 'vue'
import moment from 'moment'

moment.locale('pt-br')

export default Vue.extend({
  data() {
    return {
      day: `${moment().format('dddd')}, ${moment().format('LL').toLowerCase()}`,
      time: moment().format('LT'),
      update: 0,
    }
  },
  mounted() {
    this.update = setInterval(() => {
      this.time = moment().format('LT')
    }, 5000)
  },
  beforeDestroy() {
    clearInterval(this.update)
  },
})
</script>

<style lang="scss">
.time-current {
  text-align: center;

  &-day {
    color: $pt-midnight;
    font-family: 'Roboto';
    font-size: 14px;
  }

  &-time {
    color: $pt-midnight;
    font-family: 'Roboto';
    font-size: 36px;
    font-weight: bold;
  }
}
</style>
