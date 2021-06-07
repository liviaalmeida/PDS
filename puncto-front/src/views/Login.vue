<template>
  <div>
    <div class="container">
      <div class="row">
        <div class="col-md-6 offset-md-3 card">
          <div class="logo">
            <PtIcon name="watch" />
            <h1>puncto</h1>
          </div>
          <div class="text">
            <p>Gerencie seu tempo com clientes, crie invoices e acompanhe seu fluxo de caixa em um lugar só. É gratuito!</p>
          </div>
          <div class="form-group" @submit="onSubmit" @reset="onReset">
            <PtInput disabled="false" icon="email" label="Email" placeholder="Digite seu email para entrar" required="true" type="email" v-model="form.email">
              Button content
            </PtInput>
            <PtInput disabled="false" icon="lock" label="Senha" placeholder="Digite sua senha" required="true" type="password" v-model="form.password">
              Button content
            </PtInput>
            <PtButton disabled="false" help="Help message under button" type="submit">
              Login
            </PtButton>
          </div>
        </div>
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
