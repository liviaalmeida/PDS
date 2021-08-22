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
      <PtModal v-model="error" title="Erro!"
      type="error" :message="errorMessage" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { Endpoint } from '../api'

export default Vue.extend({
  created: function(){
    this.$analytics.logEvent('login_view')
  },
  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      error: false,
      errorMessage: '',
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
    endpoint(): Endpoint {
      return this.loginType === 'login' ? this.$api.auth.login : this.$api.auth.signup
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
      this.$analytics.logEvent('usuario_login_tentativa', { user: this.form.email })
      this.$store.dispatch('loadStart')
      try {
        const answer = await this.$api.fetch(this.endpoint, this.form)
        const { authToken } = answer
        if (!authToken) {
          throw new Error(answer)
        }
        this.$cookies.set('authToken', authToken)
        this.$api.setToken(authToken)
        this.$store.dispatch('login')
        this.$router.push(this.redirect)
        this.$analytics.logEvent('usuario_login_sucesso', { user: this.form.email })
      } catch (err) {
        this.errorMessage = (this.loginType === 'login' ?
          'Erro ao logar no sistema' :
          'Erro ao criar cadastro no sistema')
          .concat(`: ${err.message}`)
        this.error = true
        this.$analytics.logEvent('usuario_login_erro', { user: this.form.email })
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
