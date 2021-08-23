<template>
	<div>
		<div class="d-flex flex-row justify-content-between">
			<PtButton class="button" @click="onCreateInvoice"> Novo Invoice</PtButton>
			<PtButton class="config"><svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="currentColor" class="bi bi-gear" viewBox="0 0 16 16">
				<path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z"/>
				<path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z"/>
				</svg>
			</PtButton>
		</div>
		<div class="invoices">
			<div class="invoices-month" v-for="mes in meses" v-bind:key="mes"> 
				<div class="d-flex flex-row justify-content-start">
					<p class="invocies-title"> <b>{{ mes }} de {{ ano }}</b> </p>
				</div>
				<div class="list d-flex flex-wrap">
					<div v-for="invoice in invoices" v-bind:key="invoice" class="invoices-item d-flex flex-row justify-content-start">
						<img src="~@/assets/imgs/invoice.png">
						<div class="invoices-info d-flex flex-column justify-content-start align-items-start">
							<div> <b>#{{ invoice.id }}</b> {{ invoice.clientTitle }} </div>
							<div class="invoices-text">{{ invoice.date }} </div>
							<div class="invoices-text">{{ invoice.currency }} {{ invoice.value }}</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
	  meses: ['Maio'],
	  ano: '2021',
      invoices: [
	    {
		  id: 1,
		  userEmail: 'brunacmelo14@gmail.com',
		  invoiceNumber: 1,
		  contractorTitle: 'teste',
		  clientTitle: 'A fantástica Fábrica de Chocolate',
		  clientId: 115,
		  greeting: 'teste',
		  motivation: 'teste',
		  hourlyRate: 5,
		  currency: 'R$',
		  paymentTerms: 'pago',
		  paymentInstructions: 'pix',
		  bankInfo: 'nubank',
		  thankYouText: 'Muito obrigada!',
		  signature: 'Bruna Campos',
		  date: '12 de maio de 2021',
		  value: '200.00'
	    },
	    {
		  id: 2,
		  userEmail: 'brunacmelo14@gmail.com',
		  invoiceNumber: 1,
		  contractorTitle: 'teste',
		  clientTitle: 'A fantástica Fábrica de Chocolate',
		  clientId: 115,
		  greeting: 'teste',
		  motivation: 'teste',
		  hourlyRate: 5,
		  currency: 'R$',
		  paymentTerms: 'pago',
		  paymentInstructions: 'pix',
		  bankInfo: 'nubank',
		  thankYouText: 'Muito obrigada!',
		  signature: 'Bruna Campos',
		  date: '14 de maio de 2021',
		  value: '1200.00'
	    },
	    {
		  id: 3,
		  userEmail: 'brunacmelo14@gmail.com',
		  invoiceNumber: 1,
		  contractorTitle: 'teste',
		  clientTitle: 'A fantástica Fábrica de Chocolate',
		  clientId: 115,
		  greeting: 'teste',
		  motivation: 'teste',
		  hourlyRate: 5,
		  currency: 'R$',
		  paymentTerms: 'pago',
		  paymentInstructions: 'pix',
		  bankInfo: 'nubank',
		  thankYouText: 'Muito obrigada!',
		  signature: 'Bruna Campos',
		  date: '30 de maio de 2021',
		  value: '500.00'
	    }
	  ]
    }
  },
  methods: {
    onCreateInvoice: function() {
      alert('Criar um novo invoice')
    }
  },
})
</script>

<style lang="scss" scoped>
.button {
	width: 281px;
}
.config {
	width: 50px;
	font-size: 30px;
}
.invoices {
	width: 100%;
	background: rgba(237, 237, 237, 0.5);
	border-radius: 5px;

	&-month {
		margin: 10px;
		padding: 20px;
	}
	&-item {
		margin: 10px;
	}
	&-text {
		font-family: Roboto;
		font-style: normal;
		font-weight: normal;
		font-size: 12px;
		color: #000000;
	}
	&-info {
		margin: 10px;
	}
}

</style>
