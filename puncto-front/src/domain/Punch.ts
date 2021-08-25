import moment from 'moment'

export interface Time {
  hours: number
  minutes: number
}
export class Punch {
  id = '0'
  timestampDateEntrada? = 0
  timestampDateSaida? = 0
  clienteId = ''
  descricaoAtividade = ''

  static offset(start: number, end: number): Time {
    const startDate = moment(start)
    const endDate = moment(end)

    const hours = endDate.diff(startDate, 'hours')
    const minutes = endDate.diff(startDate, 'minutes')

    return {
      hours,
      minutes,
    }
  }

  static duration({ timestampDateEntrada, timestampDateSaida }: Punch): Time | undefined {
    if (!timestampDateEntrada) return

    const now = new Date()
    const start = moment(timestampDateEntrada)
    
    if (timestampDateSaida) {
      return Punch.offset(timestampDateEntrada, timestampDateSaida)
    }
    
    if (moment(now).isSame(start, 'day')) {
      return Punch.offset(timestampDateEntrada, now.getTime())
    }
  }

  static totalDuration(punches: Punch[]): string | undefined {
    if (!punches.length) return

    const closed = punches.every(p => !!p.timestampDateEntrada && !!p.timestampDateSaida)
    const today = moment().isSame(punches[0].timestampDateEntrada, 'day')
    if (!closed && !today) return

    const duration = punches
      .map(p => Punch.duration(p))
      .reduce((total, duration) => ({
        hours: (total?.hours || 0) + (duration?.hours || 0),
        minutes: (total?.minutes || 0) + (duration?.minutes || 0),
      }), { hours: 0, minutes: 0 })
    
    if (!duration) return

    const minutes = duration.minutes % 60
    const hours = duration.hours + Math.floor(duration.minutes / 60)
    return moment().hours(hours).minutes(minutes).format('LT')
  }

  constructor(start?: number) {
    if (start) this.timestampDateEntrada = start
  }
}
