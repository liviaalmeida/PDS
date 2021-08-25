export class Utils {
  static currency(num: number, currency: string): string {
    const formatOptions = {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    }
    return `${currency} ${Intl.NumberFormat('pt-BR', formatOptions).format(num)}`
  }

  static normalize(str: string): string {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
  }

  static normalizeTime(num: number): string {
    return num.toString().padStart(2, '0')
  }
}
