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
      <PtInput small required
        label="Saudação"
        v-model="invoice.greeting"
        icon="clients"
        :placeholder="InvoicePlaceholder.greeting"
        :help="InvoiceHelp.greeting"
      />
      <PtInput small required
        label="Motivação"
        v-model="invoice.motivation"
        type="textarea"
        icon="clients"
        :placeholder="InvoicePlaceholder.motivation"
        :help="InvoiceHelp.motivation"
      />
      <div class="invoice-rates">
        <PtInput small required
          label="Valor da hora" type="number"
          v-model="invoice.hourlyRate"
          icon="clients"
          :placeholder="InvoicePlaceholder.hourlyRate"
        />
        <PtInput small required
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
        :value="total"
        icon="clients"
      />

      <div class="d-flex flex-row justify-content-between">
        <div class="invoice-calendar">
          <PtCalendar v-model="dateSelected"
          :fullfilled="[]" :pending="[]" /> 
        </div>
        <div class="d-flex flex-column flex-fill invoice-dates">
          <PtInput small required
            label="Início"
            :value="date.start"
            icon="clients"
            readonly
          />
          <PtInput small required
            label="Final"
            :value="date.end"
            icon="clients"
            readonly
          />
          <PtHelp :text="InvoiceHelp.period" />
        </div>
      </div>
      <PtInput small required
        label="Termos de pagamento"
        v-model="invoice.paymentTerms"
        icon="clients"
        :placeholder="InvoicePlaceholder.paymentTerms"
        :help="InvoiceHelp.paymentTerms"
      />
      <PtInput small required
        label="Instruções de pagamento"
        v-model="invoice.paymentInstructions"
        icon="clients"
        :placeholder="InvoicePlaceholder.paymentInstructions"
        :help="InvoiceHelp.paymentInstructions"
      />
      <PtInput small required
        label="Dados bancários"
        v-model="invoice.bankInfo"
        type="textarea"
        icon="clients"
        :placeholder="InvoicePlaceholder.bankInfo"
        :help="InvoiceHelp.bankInfo"
      />
      <PtInput small required
        label="Agradecimento"
        v-model="invoice.thankYouText"
        icon="clients"
        :placeholder="InvoicePlaceholder.thankYouText"
        :help="InvoiceHelp.thankYouText"
      />
      <PtInput small required
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
import moment from 'moment'
import { CalendarDate } from '../common/calendar/PtCalendar.vue'
import { Option } from '../common/input/PtSelect.vue'
import { Client } from '../domain/Client'
import { InvoiceHelp, InvoicePlaceholder } from '../domain/Invoice'
import { Utils } from '../domain/Utils'

export default Vue.extend({
  created: function(){
    this.$analytics.logEvent('registration_view')
  },
  data() {
    return {
      clients: [] as Option[],
      dateSelected: {
        start: new Date(),
        end: new Date(),
      } as CalendarDate,
      date: {
        start: '',
        end: '',
      },
      invoice: {
        id: '',
        userEmail: '',
        invoiceNumber: 0,
        contractorTitle: '',
        clientTitle: '',
        clientId: '',
        greeting: '',
        motivation: '',
        hourlyRate: 0,
        totalHours: 0,
        currency: '',
        paymentTerms: '',
        paymentInstructions: '',
        bankInfo: '',
        thankYouText: '',
        signature: '',
      },
      InvoiceHelp,
      InvoicePlaceholder,
      hourlyRate: '',
    }
  },
  computed: {
    total(): string {
      const { currency, hourlyRate, totalHours } = this.invoice
      if (!currency || !hourlyRate || !totalHours) return ''
      return Utils.currency(hourlyRate * totalHours, currency)
    },
  },
  watch: {
    dateSelected: {
      deep: true,
      handler: function() {
        const format = (date: Date) => moment(date).format('DD/MM/YYYY')
        this.date = {
          start: format(this.dateSelected.start),
          end: this.dateSelected.end ? format(this.dateSelected.end) : '',
        }
      },
    },
  },
  methods: {
    async getClients() {
      this.clients = (await this.$api.fetch(this.$api.client.get))
        .map((cl: Client) => ({ payload: cl.id, text: cl.name }))
      this.clients.sort((a, b) => a.text < b.text ? -1 : 1)
    },
    onCreate() {
      alert(JSON.stringify(this.invoice))
    },
  },
  mounted() {
    this.getClients()
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
