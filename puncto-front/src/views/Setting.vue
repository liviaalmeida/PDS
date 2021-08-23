<template>
    <div class="invoice d-flex flex-column align-items-center">
        <PtInput class="invoice-input"
            label="Títulos de prestação"
            v-model="invoice.constractorTitle"
            type="text"
            icon="clients"
        />
        <PtInput class="invoice-input"
            label="Títulos do cliente"
            v-model="invoice.clientTitle"
            type="text"
            icon="clients"
        />
        <PtInput class="invoice-input"
            label="Saudações"
            v-model="invoice.greeting"
            type="text"
            icon="clients"
        />
        <PtInput class="invoice-input"
            label="Termos de Pagamento"
            v-model="invoice.paymentTerms"
            type="text"
            icon="clients"
        />
        <PtInput class="invoice-input"
            label="Instruções de pagamento"
            v-model="invoice.paymentInstructions"
            type="text"
            icon="clients"
        />
        <PtInput class="invoice-input"
            label="Agradecimentos"
            v-model="invoice.thankYouText"
            type="textarea"
            icon="clients"
        />
        <PtInput class="invoice-input"
            label="Assinaturas"
            v-model="invoice.signature"
            type="text"
            icon="clients"
        />
    </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      invoices: {
        contractorTitle: '',
        clientTitle: '',
        greeting: '',
        paymentTerms: '',
        paymentInstructions: '',
        thankYouText: '',
        signature: '',
      },
    }
  }
})
</script>

<style lang="scss" scoped>
.invoice {
    background: rgba(237, 237, 237, 0.5);
    border-radius: 5px;
    &-input {
        width: 80%;
        background-color: #FFF;
        border-color: #FFF;
        margin: 15px;
    }
}
.button {
    width: 30%;
}
</style>
