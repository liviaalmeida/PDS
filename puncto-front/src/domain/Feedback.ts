export class Feedback {
  title = ''
  message = ''
  type: 'error' | 'info' | 'success' = 'info'
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
  static Saved: Feedback = {
    message: 'Dados pessoais atualizados com sucesso',
    title: 'Dados salvos!',
    type: 'success',
  }

  static CustomError: (err: string) => Feedback = (err) => ({
    message: `Erro ao atualizar cadastro! ${err}`,
    title: 'Erro!',
    type: 'error',
  })
}
