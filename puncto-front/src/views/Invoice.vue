<template>
    <div class="invoice d-flex flex-column align-items-center">
        <PtInput class="invoice-input"
            label="Número"
            v-model="invoice.id"
            type="text"
            icon="clients"
            placeholder="Número do invoice"
        />
        <PtInput class="invoice-input"
            label="Título de prestação"
            v-model="invoice.contractorTitle"
            type="text"
            icon="clients"
            required
            placeholder="Por exemplo 'Prestador de serviço'"
        />
        <PtInput class="invoice-input"
            label="Título do cliente"
            v-model="invoice.clientTitle"
            type="text"
            icon="clients"
            required
            placeholder="Por exemplo 'Tomador de serviço'"
        />
        <PtInput class="invoice-input"
            label="Cliente"
            v-model="invoice.clientTitle"
            type="text"
            icon="clients"
            required
            placeholder="Nome do cliente"
        />
        <PtInput class="invoice-input"
            label="Saudação"
            v-model="invoice.greeting"
            type="text"
            icon="clients"
            placeholder="Por exemplo 'Caros [NOME DO CLIENTE]"
        />
        <PtInput class="invoice-input"
            label="Motivação"
            v-model="invoice.motivation"
            type="textarea"
            icon="clients"
            placeholder="Por exemplo 'Cobrança referente às atividades realizadas para clieten tal sobre textos sobre educação à distância no período do dia 14 de março de 2021 a 10 de abril de 2021'"
        />
        <div class="d-flex flex-row">
            <PtInput class="invoice-input-hora"
                label="Valor da hora"
                v-model="invoice.hourlyRate"
                type="text"
                icon="clients"
                placeholder="Digite o valor da hora"
            />
            <PtInput class="invoice-input-hora"
                label="Moeda"
                v-model="invoice.currency"
                type="text"
                icon="clients"
                placeholder="Digite a unidade monetária"
            />
        </div>
        <PtInput class="invoice-input"
            label="Total"
            v-model="total"
            type="text"
            icon="clients"
        />

        <div class="d-flex flex-row">
            <PtCalendar class="invoice-calendar" v-model="daySelected"
            :fullfilled="[]" :pending="[]" /> 
            <div class="d-flex flex-column">
                <PtInput class="invoice-input-hora"
                    label="Início"
                    v-model="daySelected"
                    type="text"
                    icon="clients"
                />
                <PtInput class="invoice-input-hora"
                    label="Moeda"
                    v-model="invoice.currency"
                    type="text"
                    icon="clients"
                />
            </div>
        </div>
        <PtInput class="invoice-input"
            label="Termos de pagamento"
            v-model="invoice.paymentTerms"
            type="text"
            icon="clients"
            placeholder="Por exemplo 'Termos de pagamento: pagar em até 5 dias úteis'"
        />
        <PtInput class="invoice-input"
            label="Instruções de pagamento"
            v-model="invoice.paymentInstructions"
            type="text"
            icon="clients"
            required
            placeholder="Por exemplo 'Por favor deposite o total na conta bancária a seguir'"
        />
        <PtInput class="invoice-input"
            label="Dados bancários"
            v-model="invoice.bankInfo"
            type="textarea"
            icon="clients"
            required
            placeholder="Os dados bancários para recebimento. Por exemplo, o seu banco, conta e agência, ou ainda os dados de depósito de remessa, para o caso de clientes no exterior."
        />
        <PtInput class="invoice-input"
            label="Agradecimento"
            v-model="invoice.thankYouText"
            type="text"
            icon="clients"
            placeholder="Por exemplo “Grata/Grato por trabalharem conosco”"
        />
        <PtInput class="invoice-input"
            label="Assinatura"
            v-model="invoice.signature"
            type="text"
            icon="clients"
            placeholder="Por exemplo o seu nome físcio"
        />
        <PtButton @click="onCreate" class="button">Criar</PtButton>

    </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  created: function(){
    this.$analytics.logEvent('registration_view')
  },
  data() {
    return {
      total: '500.00',
      daySelected: '',
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
    &-input {
        width: 80%;
        background-color: #FFF;
        border-color: #FFF;
        margin: 15px;
    }
    &-input-hora {
        width: 242px;
        background-color: #FFF;
        border-color: #FFF;
        margin: 15px;
    }
    &-calendar {
        background-color: #FFF;
        margin: 15px;
    }
}
.button {
    width: 30%;
}
</style>
