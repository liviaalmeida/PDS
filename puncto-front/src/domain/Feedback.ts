export class Feedback {
  message = ''
  title = ''
  type: 'error' | 'info' | 'success' = 'info'
}

export class ClientFeedback {
  static CreateError: (err: string) => Feedback = (err) => ({
    message: `Erro ao criar cliente! ${err}`,
    title: 'Erro!',
    type: 'error',
  })

  static CreateSuccess: Feedback = {
    message: 'Cliente criado com sucesso',
    title: 'Dados salvos!',
    type: 'success',
  }

  static DeleteError: (err: string) => Feedback = (err) => ({
    message: `Erro ao remover cliente! ${err}`,
    title: 'Erro!',
    type: 'error',
  })

  static DeleteSuccess: Feedback = {
    message: 'Cliente removido com sucesso',
    title: 'Dados salvos!',
    type: 'success',
  }

  static SaveError: (err: string) => Feedback = (err) => ({
    message: `Erro ao salvar dados do cliente! ${err}`,
    title: 'Erro!',
    type: 'error',
  })

  static SaveSuccess: Feedback = {
    message: 'Dados do cliente salvos com sucesso',
    title: 'Dados salvos!',
    type: 'success',
  }
}

export class InvoiceFeedback {
  static CreateSuccess: Feedback = {
    message: 'Invoice criado com sucesso',
    title: 'Invoice salvo!',
    type: 'success',
  }

  static CustomError: (err: string) => Feedback = (err) => ({
    message: `Erro ao atualizar cadastro! ${err}`,
    title: 'Erro!',
    type: 'error',
  })
}

export class LoginFeedback {
  static LoginError: (err: string) => Feedback = (err) => ({
    message: `Erro ao logar no sistema: ${err}`,
    title: 'Erro!',
    type: 'error',
  })

  static SignupError: (err: string) => Feedback = (err) => ({
    message: `Erro ao criar cadastro no sistema: ${err}`,
    title: 'Erro!',
    type: 'error',
  })
}

export class PunchFeedback {
  static IntervalError: Feedback = {
    message: 'Hora de saída não pode ser menor que hora de entrada',
    title: 'Erro ao registrar ponto',
    type: 'error',
  }

  static MultiplePendenciesError: Feedback = {
    message: 'Não é possível deixar mais de um ponto aberto',
    title: 'Erro ao registrar ponto',
    type: 'error',
  }

  static OverrideError: Feedback = {
    message: 'Você não pode ter uma hora de saída maior que a hora de entrada seguinte',
    title: 'Erro ao registrar ponto',
    type: 'error',
  }

  static PastPendencyError: Feedback = {
    message: 'Apenas o último ponto do dia atual pode ficar em aberto',
    title: 'Erro ao registrar ponto',
    type: 'error',
  }

  static TimeTravelerError: Feedback = {
    message: 'Você não pode criar um ponto no futuro',
    title: 'Erro ao registrar ponto',
    type: 'error',
  }
}

export class UserFeedback {
  static CustomError: (err: string) => Feedback = (err) => ({
    message: `Erro ao atualizar cadastro! ${err}`,
    title: 'Erro!',
    type: 'error',
  })

  static SaveSuccess: Feedback = {
    message: 'Dados pessoais atualizados com sucesso',
    title: 'Dados salvos!',
    type: 'success',
  }
}
