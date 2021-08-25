export class Utils {
  static currency(num: number, currency: string): string {
    return Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency,
    }).format(num)
  }

  static normalize(str: string): string {
    return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
  }
}
