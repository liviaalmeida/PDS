export class Punch {
  id = '0'
  timestampDateEntrada? = 0
  timestampDateSaida? = 0
  clientId = ''
  descricaoAtividade? = ''

  constructor(start?: number) {
    if (start) this.timestampDateEntrada = start
  }
}

export interface Month {
  aberto: boolean
  possuiPonto: boolean
  dia: number
}
