<template>
  <div class="login container">
    <PtLogo />
    <div class="login-card card">
      <div class="login-text">
        <p>Gerencie seu tempo com clientes, crie invoices e acompanhe seu fluxo de caixa em um lugar só. É gratuito!</p>
      </div>
      <form @submit.prevent="onSubmit" @reset.prevent="onReset">
        <PtInput label="Email" v-model="form.email"
        type="email" icon="email" required
        class="login-input"
        placeholder="Digite seu email para entrar" />
        <PtInput label="Senha" v-model="form.password"
        type="password" icon="lock" required
        class="login-input"
        placeholder="Digite sua senha" />
        <PtButton>
          Login
        </PtButton>
      </form>
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

<style lang="scss">
.login {
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 10px;
  max-width: 415px;

  &-card {
    background: white;
    border-radius: 5px;
    padding: 20px 30px;
  }

  &-text {
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

  &-input {
    margin-bottom: 10px;
  }
}
</style>
