<template>
  <div>
    <div class="container">
      <div class="card">
        <div class="logo">
          <PtIcon name="watch" />
          <h1>puncto</h1>
        </div>
        <div class="text">
          <p>Gerencie seu tempo com clientes, crie invoices e acompanhe seu fluxo de caixa em um lugar só. É gratuito!</p>
        </div>
        <b-form class="form" @submit="onSubmit" @reset="onReset">
          <b-form-group id="input-group-1" class="input" label="Email:" label-for="input-1">
            <b-form-input id="input-1" v-model="form.email" type="email" placeholder="Digite seu email para entrar" required></b-form-input>
          </b-form-group>
          <b-form-group id="input-group-2" class="input" label="Senha:" label-for="input-2">
            <b-form-input id="input-2" v-model="form.password" placeholder="Digite sua senha" required></b-form-input>
          </b-form-group>
          <b-button type="submit" class="button" variant="primary">Login</b-button>
        </b-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    onSubmit(event) {
      event.preventDefault()
      alert(JSON.stringify(this.form))
      return
    },
    onReset(event) {
      event.preventDefault()
      this.form.email = ''
      this.form.password = ''
      return
    }
  }
}
</script>

<style>
  p {
    
  }
  .card {
    width: 500px;
    position: absolute;
    left: 477px;
    top: 247px;
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

  .logo {
    align-items: center;
    align: center;
    gap: 5px;
    h1 {
      color: $pt-sapphire;
      font-family: 'Ubuntu';
      font-size: 28px;
    }
  }

  .input {
    margin: 10px 0px 20px 85px;
    border: 1px solid #000000;
    box-sizing: border-box;
    border-radius: 5px;
    width: 324px;
    height: 50px;
  }

  .button {
    background: #324B96;
    border-radius: 5px;
    width: 324px;
    height: 50px;
    margin-bottom: 20px; 
  }

</style>
