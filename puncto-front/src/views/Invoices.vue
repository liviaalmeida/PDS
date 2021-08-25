<template>
  <div>
    <div class="d-flex justify-content-between">
      <PtButton class="button" @click="$router.push('invoices/new')"> Novo Invoice</PtButton>
      <PtButton small @click="$router.push('invoices/setting')">
        <PtIcon name="settings" />
      </PtButton>
    </div>
    <div class="invoices">
      <div class="invoices-month"> 
        <div class="d-flex flex-wrap">
          <div v-for="invoice in invoices" :key="invoice.id" class="invoices-item d-flex flex-row justify-content-start">
            <img class="invoices-icon" src="~@/assets/imgs/invoice.png">
            <div class="invoices-info d-flex flex-column justify-content-start align-items-start">
              <div> <b>#{{ invoice.invoiceNumber }}</b> {{ invoice.clientTitle }} </div>
              <div class="invoices-text">{{ invoiceDate(invoice) }} </div>
              <div class="invoices-text">{{ totalRate(invoice) }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import moment from 'moment'
import { Invoice } from '../domain/Invoice'
import { Utils } from '../domain/Utils'

moment.locale('pt-br')

export default Vue.extend({
  data() {
    return {
      invoices: [] as Invoice[],
    }
  },
  methods: {
    async getInvoices() {
      this.invoices = await this.$api.fetch(this.$api.invoice.all)
    },
    invoiceDate({ createdAt }: Invoice) {
      return moment(Number(createdAt)).format('LL')
    },
    totalRate({ currency, totalHours, hourlyRate }: Invoice): string {
      return Utils.currency(totalHours * hourlyRate, currency)
    },
  },
  mounted() {
    this.getInvoices()
  },
})
</script>

<style lang="scss" scoped>
.button {
  width: 281px;
}

.invoices {
  width: 100%;
  background: rgba($pt-fog, .5);
  border-radius: 5px;

  &-month {
    margin: 25px 10px 10px;
    padding: 20px;
  }

  &-icon {
    height: 58px;
    width: 40px;
  }

  &-item {
    margin: 10px;
  }

  &-text {
    font-family: Roboto;
    font-style: normal;
    font-weight: normal;
    font-size: 12px;
    color: $pt-midnight;
  }

  &-info {
    margin: 0 10px;
  }
}
</style>
