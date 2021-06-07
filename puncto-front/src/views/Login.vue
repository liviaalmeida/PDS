<template>
  <div class="container">
    <div class="row align-items-center h-100">
      <div class=" col-4 mx-auto card">
        <PtLogo />
        <div class="text">
          <p>Gerencie seu tempo com clientes, crie invoices e acompanhe seu fluxo de caixa em um lugar só. É gratuito!</p>
        </div>
        <form @submit.prevent="onSubmit" @reset="onReset">
          <PtInput label="Email" v-model="form.email" icon="email" required placeholder="Digite seu email para entrar" />
          <PtInput label="Senha" v-model="form.password" type="password" icon="lock" required placeholder="Digite sua senha" />
          <PtButton> Login </PtButton>
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
        email: '',
        password: '',
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
      this.form.email = ''
      this.form.password = ''
    },
  },
})
</script>

<style>
  .view {
    background-image: url('~@/assets/imgs/background.png');
  }

  .card {
    /*width: 500px;
    position: absolute;
    left: 477px;
    top: 247px;*/
    background: white;
    border-radius: 5px 5px 0px 0px;
  }

  .text {
    padding: 20px;
    align: center;
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

  .container {
    height: 100%;
  }

</style>
