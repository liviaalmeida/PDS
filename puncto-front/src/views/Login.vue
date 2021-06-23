<template>
  <div class="login container">
    <PtLogo />
    <div class="login-card">
      <div class="login-text">
        <p>Gerencie seu tempo com clientes, crie invoices e acompanhe seu fluxo de caixa em um lugar só. É gratuito!</p>
      </div>
      <div class="login-type">
        <label>
          <input type="radio" name="login-type"
          v-model="loginType" value="login">
          <span>login</span>
        </label>
        <label>
          <input type="radio" name="login-type"
          v-model="loginType" value="sign-up">
          <span>sign-up</span>
        </label>
      </div>
      <form @submit.prevent="onSubmit" @reset.prevent="onReset"
      @input="onInput($event.target.form)">
        <PtInput label="Email" v-model="form.email"
        type="email" icon="email" required
        class="login-input"
        placeholder="Digite seu email para entrar" />
        <PtInput label="Senha" v-model="form.password"
        type="password" icon="lock" required
        class="login-input"
        placeholder="Digite sua senha"
        :input-attrs="{ minLength: 6 }" />
        <PtButton :disabled="!valid">
          {{ button }}
        </PtButton>
      </form>
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
      loading: false,
      loginType: 'login',
      valid: false,
    }
  },
  computed: {
    button(): string {
      return this.loginType === 'login' ?
        'Login' : 'Sign Up'
    },
    redirect(): string {
      return this.$route.query?.redirect as string || '/'
    },
  },
  methods: {
    onInput(form: HTMLFormElement): void {
      this.valid = form.checkValidity()
    },
    onReset(): void {
      this.form.email = ''
      this.form.password = ''
    },
    async onSubmit() {
      this.$store.dispatch('loadStart')
      try {
        const endpoint = this.loginType === 'login' ? this.$api.auth.login : this.$api.auth.signup
        const { authToken } = await this.$api.fetch(endpoint, this.form)
        this.$cookies.set('authToken', authToken)
        this.$api.setToken(authToken)
        this.$store.dispatch('login')
        this.$router.push(this.redirect)
      } catch {
        alert('Erro ao tentar logar')
      } finally {
        this.$store.dispatch('loadStop')
      }
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

  &-type {
    color: $pt-sapphire;
    display: flex;
    justify-content: space-between;
    font-family: 'Ubuntu';
    margin-bottom: 20px;

    input {
      display: none;
    }

    span {
      cursor: pointer;
      font-size: 20px;
      opacity: .5;
    }

    input:checked ~ span {
      opacity: 1;
    }
  }

  &-card {
    background: white;
    border-radius: 5px;
    padding: 20px 30px;
  }

  &-text {
    font-family: 'Ubuntu';
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
