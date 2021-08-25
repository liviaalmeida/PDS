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
          min="0" step="0.01"
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
    <PtModal v-model="modal" :feedback="feedback" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import moment from 'moment'
import { CalendarDate } from '../common/calendar/PtCalendar.vue'
import { Option } from '../common/input/PtSelect.vue'
import { Client } from '../domain/Client'
import { Invoice, InvoiceHelp, InvoicePlaceholder } from '../domain/Invoice'
import { Utils } from '../domain/Utils'
import { Punch } from '../domain/Punch'
import { Feedback, InvoiceFeedback } from '../domain/Feedback'

export default Vue.extend({
  created: function(){
    this.$analytics.logEvent('registration_view')
  },
  data() {
    return {
      clients: [] as Option[],
      dateSelected: {
        start: new Date(),
        end: undefined,
      } as CalendarDate,
      invoice: {
        id: '',
        createdAt: '',
        userEmail: '',
        invoiceNumber: '',
        contractorTitle: '',
        clientTitle: '',
        clientId: '',
        greeting: '',
        motivation: '',
        hourlyRate: '',
        totalHours: '',
        currency: '',
        paymentTerms: '',
        paymentInstructions: '',
        bankInfo: '',
        thankYouText: '',
        signature: '',
      },
      InvoiceHelp,
      InvoicePlaceholder,
      feedback: new Feedback(),
      modal: false,
    }
  },
  computed: {
    date(): { start: string, end: string } {
      const format = (date: Date) => moment(date).format('DD/MM/YYYY')

      return {
        start: format(this.dateSelected.start),
        end: this.dateSelected.end ? format(this.dateSelected.end) : '',
      }
    },
    days(): number[] {
      const { start, end } = this.dateSelected
      if (!end) return []
      return Array.from(
        { length: moment(end).diff(start, 'days') + 1 },
        (_, index) => moment(start).add(index, 'days').toDate().getTime()
      )
    },
    total(): string {
      const { currency, hourlyRate, totalHours } = this.invoice
      if (!currency || !hourlyRate || !totalHours) return ''
      return Utils.currency(Number(hourlyRate) * Number(totalHours), currency)
    },
  },
  watch: {
    async days() {
      const punches = (await Promise.all(
        this.days
          .map(async day => (await this.$api.fetch(this.$api.punch.day(day))) as Punch[])
      ))
        .filter((pcs: Punch[]) => pcs.length)
        .reduce<Punch[]>((all, pc: Punch[]) => [ ...all, ...pc ], [])
        .filter(pc => pc.timestampDateEntrada && pc.timestampDateSaida)

      const { hours, minutes } = Punch.totalDuration(punches) || { hours: 0, minutes: 0 }
      this.invoice.totalHours = (hours + (minutes / 60.0)).toString()
    },
    modal() {
      if (this.modal) return
      if (this.feedback.type !== 'success') return
      this.$router.push('/invoices')
    },
  },
  methods: {
    async getClients() {
      this.clients = (await this.$api.fetch(this.$api.client.get))
        .map((cl: Client) => ({ payload: cl.id, text: cl.name }))
      this.clients.sort((a, b) => a.text < b.text ? -1 : 1)
    },
    async onCreate() {
      this.invoice.invoiceNumber = await this.validateNumber(this.invoice.invoiceNumber)
      this.invoice.createdAt = new Date().getTime().toString()
      
      try {
        await this.$api.fetch(this.$api.invoice.create, this.invoice)
        this.showModal(InvoiceFeedback.CreateSuccess)
      } catch (err) {
        this.showModal(InvoiceFeedback.CustomError(err.message))
      }
    },
    showModal(feedback: Feedback) {
      this.feedback = feedback
      this.modal = true
    },
    async validateNumber(num: string): Promise<string> {
      const invoices = (await this.$api.fetch(this.$api.invoice.all)) as Invoice[]
      const numbers = invoices.map(inv => Number(inv.invoiceNumber))
      if (numbers.includes(Number(num))) {
        const next = (Math.max(...numbers) + 1).toString()
        return new Promise(resolve => resolve(next))
      }
      return new Promise(resolve => resolve(num))
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
