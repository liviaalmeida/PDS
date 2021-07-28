<template>
  <div class="registration d-flex justify-content-center align-items-center">
    <form
      @submit.prevent="onSubmit"
      @reset.prevent="onReset"
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
        v-model="user.address.line1"
        type="text"
        icon="marker"
        required
        placeholder="Digite seu endereço"
      />
      <PtInput
        label="Linha 2"
        v-model="user.address.line2"
        type="text"
        icon="marker"
        required
        placeholder="Digite seu endereço"
      />
      <PtInput
        label="Linha 3"
        v-model="user.address.line3"
        type="text"
        icon="marker"
        required
        placeholder="Digite seu endereço"
      />
      <PtButton class="button"> Salvar </PtButton>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  data() {
    return {
      user: {
        name: '',
        cnpj: '',
        email: '',
        address: {
          line1: '',
          line2: '',
          line3: '',
        },
      },
    }
  },
  methods: {
    onSubmit(): void {
      alert(JSON.stringify(this.user))
    },
    onReset(): void {
      this.user.name = ''
      this.user.cnpj = ''
      this.user.email = ''
      this.user.address = {
        line1: '',
        line2: '',
        line3: '',
      }
    },
  },
  async mounted() {
    this.$store.dispatch('loadStart')
    const user = await this.$api.fetch(this.$api.auth.userData)

    this.user = {
      ...this.user,
      ...user,
    }

    this.$store.dispatch('loadStop')
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
