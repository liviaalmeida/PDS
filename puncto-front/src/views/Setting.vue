<template>
    <div class="invoices d-flex flex-column align-items-center">
        <PtInput class="invoices-input"
            label="Títulos de prestação"
            v-model="invoices.constractorTitle"
            type="text"
            icon="clients"
        />
        <PtInput class="invoices-input"
            label="Títulos do cliente"
            v-model="invoices.clientTitle"
            type="text"
            icon="clients"
        />
        <PtInput class="invoices-input"
            label="Saudações"
            v-model="invoices.greeting"
            type="text"
            icon="clients"
        />
        <PtInput class="invoices-input"
            label="Termos de Pagamento"
            v-model="invoices.paymentTerms"
            type="text"
            icon="clients"
        />
        <PtInput class="invoices-input"
            label="Instruções de pagamento"
            v-model="invoices.paymentInstructions"
            type="text"
            icon="clients"
        />
        <PtInput class="invoices-input"
            label="Agradecimentos"
            v-model="invoices.thankYouText"
            type="textarea"
            icon="clients"
        />
        <PtInput class="invoices-input"
            label="Assinaturas"
            v-model="invoices.signature"
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
.invoices {
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
