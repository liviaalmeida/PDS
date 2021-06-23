<template>
  <div class="row align-items-center h-100">
    <div class="d-flex flex-column align-items-center mx-auto">
      <div class="p-2 bd-highlight formulary">
        <form @submit.prevent="onSubmit" @reset="onReset">
          <PtInput label="Nome" v-model="form.name" icon="profile" required placeholder="Nome Completo" />
          <div class="d-flex justify-content-between">
            <PtInput class="input" label="CNPJ" v-model="form.cnpj" type="text" icon="profile" required placeholder="Digite seu CNPJ" />
            <PtInput class="input" label="Email" v-model="form.email" type="email" icon="email" required placeholder="Digite seu email" />
          </div>
          <div class="address"><p> Endereço </p></div>
          <PtInput label="Linha 1" v-model="form.addres" type="text" icon="marker" required placeholder="Digite seu endereço" />
          <PtInput label="Linha 1" v-model="form.addres" type="text" icon="marker" required placeholder="Digite seu email" />
          <PtInput label="Linha 1" v-model="form.addres" type="text" icon="marker" required placeholder="Digite seu email" />
          <PtButton class="button"> Salvar </PtButton>
        </form>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      form: {
        name: '',
        cnpj: '',
        email: '',
        address: []
      },
    }
  },
  methods: {
    onSubmit(event: any): void {
      event.preventDefault()
      alert(JSON.stringify(this.form))
    },
    onReset(event: any): void {
      event.preventDefault()
      this.form.name = ''
      this.form.cnpj = ''
      this.form.email = ''
      this.form.address = []
    },
  },
})
</script>

<style>
  .container {
    height: 100%;
  }
  .address{
    display: flex;
    margin-left: 0.5em;
  }
  .formulary {
    padding: 20px;
    width: 60%;
  }
  .input {
    width: 49%;
  }
  .text {
    text-align: center;
    font-family: Ubuntu;
    font-style: normal;
    font-weight: bold;
    font-size: 18px;
    line-height: 21px;
    display: flex;
    align-items: center;
    text-align: center;
    color: #000000;
  }
</style>
