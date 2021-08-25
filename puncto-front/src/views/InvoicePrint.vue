<template>
  <div class="print">
    <div class="print-content">
      <div class="print-title">
        Invoice #{{ invoice.invoiceNumber }}
      </div>
      <div class="print-companies d-flex justify-content-between">
        <CompanyInfo :title="invoice.contractorTitle"
        :company="user" />
        <CompanyInfo :title="invoice.clientTitle"
        :company="client" />
      </div>
      <div class="print-text">
        <div>{{ invoice.greeting }},</div>
        <div>{{ invoice.motivation }}</div>
        <div>Total: {{ total }}</div>
      </div>
      <div class="print-payment">
        <div>{{ invoice.paymentTerms }}</div>
        <div>{{ invoice.paymentInstructions }}</div>
        <div>{{ invoice.bankInfo }}</div>
      </div>
      <div class="print-end">
        <div>{{ invoice.thankYouText }},</div>
        <div>{{ invoice.signature }}</div>
        <div>{{ user.name }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Client } from '../domain/Client'
import { Invoice } from '../domain/Invoice'
import { User } from '../domain/User'
import CompanyInfo from '../components/print/CompanyInfo.vue'
import { Utils } from '../domain/Utils'

export default Vue.extend({
  components: {
    CompanyInfo,
  },
  data() {
    return {
      client: new Client(),
      invoice: new Invoice(),
      ready: false,
      user: new User(),
    }
  },
  computed: {
    invoiceId(): string {
      return this.$route.params.id
    },
    total(): string {
      const { totalHours, hourlyRate, currency } = this.invoice
      if (!totalHours || !hourlyRate || !currency) return ''
      return Utils.currency(Number(totalHours) * Number(hourlyRate), currency)
    },
  },
  async mounted() {
    const invoices = (await this.$api.fetch(this.$api.invoice.all)) as Invoice[]
    this.invoice = invoices.find(inv => inv.id === this.invoiceId) as Invoice

    const clients = (await this.$api.fetch(this.$api.client.get)) as Client[]
    this.client = clients.find(cl => cl.id === this.invoice.clientId) as Client

    this.user = (await this.$api.fetch(this.$api.user.get)) as User

    this.ready = true
    this.$nextTick(() => window.print())
  },
})
</script>

<style lang="scss">
.print {
  text-align: left;

  &-content {
    margin: 0 auto;
    max-width: 800px;
  }

  &-title {
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 25px;
  }

  &-text,
  &-payment,
  &-end {
    margin-top: 20px;
  }
}
</style>
