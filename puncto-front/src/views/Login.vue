<template>
  <div class="container">
    <div class="row align-items-center h-100">
      <div class="col-4 align-items-center mx-auto">
        <PtLogo />
        <div class="card">
          <div class="text">
            <p>Gerencie seu tempo com clientes, crie invoices e acompanhe seu fluxo de caixa em um lugar só. É gratuito!</p>
          </div>
          <form @submit.prevent="onSubmit" @reset.prevent="onReset">
            <PtInput label="Email" v-model="form.email"
            icon="email" required
            placeholder="Digite seu email para entrar" />
            <PtInput label="Senha" v-model="form.password"
            type="password" icon="lock" required
            placeholder="Digite sua senha" />
            <PtButton>
              Login
            </PtButton>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { login } from '../api'

export default Vue.extend({
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      loading: false,
    }
  },
  computed: {
    redirect(): string {
      return this.$route.query?.redirect as string || '/'
    },
  },
  methods: {
    async onSubmit() {
      this.$store.dispatch('loadStart')
      await login()
        .then(() => {
          this.$store.dispatch('login')
          this.$store.dispatch('loadStop')
          this.$router.push(this.redirect)
        })
        .catch(() => {
          this.$store.dispatch('loadStop')
        })
    },
    onReset(): void {
      this.form.email = ''
      this.form.password = ''
    },
  },
})
</script>

<style>
 /* h1 {
    color: $pt-sapphire;
    font-family: 'Ubuntu';
    font-size: 28px;
  }*/
  .container {
    height: 100%;
  }
  .card {
    background: white;
    border-radius: 5px 5px 0px 0px;
    padding: 20px;
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
  .logo {
    align-items: center;
    text-align: center;
    gap: 5px;
  }
  .input {
    border: 1px solid #000000;
    box-sizing: border-box;
    border-radius: 5px;
    /*width: 324px;
    height: 50px;
    margin: 10px 0px 20px 85px;*/
  }

  .button {
    background: #324B96;
    border-radius: 5px;
    /*width: 324px;
    height: 50px;
    margin-bottom: 20px*/; 
  }
</style>
