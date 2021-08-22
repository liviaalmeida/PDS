<template>
  <div class="registration d-flex justify-content-center align-items-center">
    <form
      @submit.prevent="onSubmit"
      @input="onInput($event.target.form)"
      class="registration-form w-100"
    >
      <PtInput
        label="Nome"
        v-model="user.name"
        icon="profile"
        required
        placeholder="Nome Completo"
      />
      <div class="registration-form-line d-flex justify-content-between">
        <PtInput
          class="registration-input"
          label="CNPJ"
          v-model="user.cnpj"
          type="text"
          icon="profile"
          required
          placeholder="Digite seu CNPJ"
          mask="##.###.###/####-##"
        />
        <PtInput
          class="registration-input"
          label="Email"
          v-model="user.email"
          type="email"
          icon="email"
          required
          placeholder="Digite seu email"
          disabled
        />
      </div>
      <div class="registration-address">Endereço</div>
      <PtInput
        label="Linha 1"
        v-model="user.address"
        type="text"
        icon="marker"
        required
        placeholder="Digite seu endereço"
      />
      <PtInput
        label="Linha 2"
        v-model="user.addressTwo"
        type="text"
        icon="marker"
        required
        placeholder="Digite seu endereço"
      />
      <PtInput
        label="Linha 3"
        v-model="user.addressThree"
        type="text"
        icon="marker"
        required
        placeholder="Digite seu endereço"
      />
      <PtButton class="button" :disabled="!valid">
        Salvar
      </PtButton>
    </form>
    <PtModal v-model="error" title="Erro!"
    type="error" :message="errorMessage" />
    <PtModal v-model="success" title="Dados salvos!" type="success"
    message="Dados pessoais atualizados com sucesso" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { User } from '../domain/User'

export default Vue.extend({
  created: function(){
    this.$analytics.logEvent('registration_view')
  },
  data() {
    return {
      user: new User(),
      error: false,
      errorMessage: '',
      success: false,
      valid: false,
    }
  },
  methods: {
    async loadUser(): Promise<void> {
      this.$store.dispatch('loadStart')
      const user = await this.$api.fetch(this.$api.user.get)

      this.user = {
        ...this.user,
        ...user,
      }

      this.$store.dispatch('loadStop')
    },
    onInput(form: HTMLFormElement) {
      this.valid = form.checkValidity()
    },
    async onSubmit(): Promise<void> {
      this.$store.dispatch('loadStart')
      try {
        const user = await this.$api.fetch(this.$api.user.update, this.user)
        this.user = { ...this.user, ...user }
        this.valid = false
        this.success = true
      } catch (err) {
        this.errorMessage = `Erro ao atualizar cadastro! ${err}`
        this.error = true
      }
      this.$store.dispatch('loadStop')
    },
  },
  mounted() {
    this.loadUser()
  },
})
</script>

<style lang="scss">
.registration {
  &-address {
    text-align: left;
    font-size: 14px;
    transform: translateY(5px);
  }
  &-form {
    max-width: 520px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
  }
  &-form,
  &-form-line {
    gap: 10px;
  }
  .formulary {
    padding: 20px;
    width: 40%;
    background-color: white;
  }
  &-input {
    flex: 1;
  }
}
</style>
