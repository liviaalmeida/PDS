import { Endpoint } from '.'

const create: Endpoint = {
  url: '/ponto',
  method: 'POST',
}

const day: (timestamp: number) => Endpoint = (timestamp) => ({
  url: `/ponto/${timestamp}`,
  method: 'GET',
})

const month: (m: number) => Endpoint = (m) => ({
  url: `/ponto/mes/${m}`,
  method: 'GET',
})

export {
  create,
  day,
  month,
}
