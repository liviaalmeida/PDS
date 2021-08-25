<template>
  <div class="invoice d-flex flex-column align-items-center">
    <form class="invoice-content d-flex flex-column"
    @submit.prevent="onCreate">
      <PtInput small
        label="Número" type="number"
        v-model="invoice.invoiceNumber"
        icon="clients"
        :placeholder="InvoicePlaceholder.invoiceNumber"
        :help="InvoiceHelp.invoiceNumber"
      />
      <PtInput small
        label="Título de prestação"
        v-model="invoice.contractorTitle"
        icon="clients"
        required
        :placeholder="InvoicePlaceholder.contractorTitle"
        :help="InvoiceHelp.contractorTitle"
      />
      <PtInput small
        label="Título do cliente"
        v-model="invoice.clientTitle"
        icon="clients"
        required
        :placeholder="InvoicePlaceholder.clientTitle"
        :help="InvoiceHelp.clientTitle"
      />
      <PtSelect small
        label="Cliente"
        v-model="invoice.clientId"
        :options="clients"
        icon="clients"
        required
        :placeholder="InvoicePlaceholder.clientId"
        :help="InvoiceHelp.clientId"
      />
      <PtInput small
        label="Saudação"
        v-model="invoice.greeting"
        icon="clients"
        :placeholder="InvoicePlaceholder.greeting"
        :help="InvoiceHelp.greeting"
      />
      <PtInput small
        label="Motivação"
        v-model="invoice.motivation"
        type="textarea"
        icon="clients"
        :placeholder="InvoicePlaceholder.motivation"
        :help="InvoiceHelp.motivation"
      />
      <div class="invoice-rates">
        <PtInput small
          label="Valor da hora"
          v-model="invoice.hourlyRate"
          icon="clients"
          :placeholder="InvoicePlaceholder.hourlyRate"
        />
        <PtInput small
          label="Moeda"
          v-model="invoice.currency"
          icon="clients"
          :placeholder="InvoicePlaceholder.currency"
          :help="InvoiceHelp.currency"
        />
      </div>
      <PtInput small class="invoice-total"
        readonly
        style="width: 250px !important;"
        label="Total"
        v-model="total"
        icon="clients"
      />

      <div class="d-flex flex-row justify-content-between">
        <div class="invoice-calendar">
          <PtCalendar v-model="daySelected"
          :fullfilled="[]" :pending="[]" /> 
        </div>
        <div class="d-flex flex-column flex-fill invoice-dates">
          <PtInput small
            label="Início"
            v-model="date.start"
            icon="clients"
          />
          <PtInput small
            label="Final"
            v-model="date.end"
            icon="clients"
          />
        </div>
      </div>
      <PtInput small
        label="Termos de pagamento"
        v-model="invoice.paymentTerms"
        icon="clients"
        :placeholder="InvoicePlaceholder.paymentTerms"
        :help="InvoiceHelp.paymentTerms"
      />
      <PtInput small
        label="Instruções de pagamento"
        v-model="invoice.paymentInstructions"
        icon="clients"
        required
        :placeholder="InvoicePlaceholder.paymentInstructions"
        :help="InvoiceHelp.paymentInstructions"
      />
      <PtInput small
        label="Dados bancários"
        v-model="invoice.bankInfo"
        type="textarea"
        icon="clients"
        required
        :placeholder="InvoicePlaceholder.bankInfo"
        :help="InvoiceHelp.bankInfo"
      />
      <PtInput small
        label="Agradecimento"
        v-model="invoice.thankYouText"
        icon="clients"
        :placeholder="InvoicePlaceholder.thankYouText"
        :help="InvoiceHelp.thankYouText"
      />
      <PtInput small
        label="Assinatura"
        v-model="invoice.signature"
        icon="clients"
        :placeholder="InvoicePlaceholder.signature"
        :help="InvoiceHelp.signature"
      />
      <PtButton class="invoice-button">
        Criar
      </PtButton>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Client } from '../domain/Client'
import { InvoiceHelp, InvoicePlaceholder } from '../domain/Invoice'

export default Vue.extend({
  created: function(){
    this.$analytics.logEvent('registration_view')
  },
  data() {
    return {
      total: '500.00',
      daySelected: new Date(),
      date: {
        start: '',
        end: '',
      },
      invoice: {
        id: '',
        userEmail: '',
        invoiceNumber: '',
        contractorTitle: '',
        clientTitle: '',
        clientId: '',
        greeting: '',
        motivation: '',
        hourlyRate: '',
        currency: '',
        paymentTerms: '',
        paymentInstructions: '',
        bankInfo: '',
        thankYouText: '',
        signature: '',
      },
      InvoiceHelp,
      InvoicePlaceholder,
      clients: [] as Client[],
    }
  },
  methods: {
    onCreate() {
      alert(JSON.stringify(this.invoice))
    }
  },
})
</script>

<style lang="scss" scoped>
.invoice {
  background: rgba(237, 237, 237, 0.5);
  border-radius: 5px;
  padding: 25px;

  &-content {
    gap: 20px;
    margin: 0 auto;
    max-width: 800px;
    width: 80%;
  }

  &-rates {
    display: grid;
    gap: 15px;
    grid-auto-flow: column;
  }

  &-total {
    border: 1px solid $pt-midnight;
    border-radius: 5px;
  }

  &-calendar {
    background-color: #FFF;
    border-radius: 5px;
    margin-right: 25px;
    padding: 10px;
  }

  &-dates {
    gap: 20px;
  }

  &-button {
    margin: 0 auto;
    width: 281px;
  }
}
</style>
