export class Punch {
  id = '0'
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
