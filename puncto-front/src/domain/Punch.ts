export class Punch {
  id = ''
  start = ''
  end? = ''
  client = ''
  activity? = ''

  constructor(start = '') {
    this.start = start
  }
}

export interface Month {
  aberto: boolean
  possuiPonto: boolean
  dia: number
}
