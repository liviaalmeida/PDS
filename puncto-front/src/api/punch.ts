import { Endpoint } from '.'

const day: (timestamp: number) => Endpoint = (timestamp) => ({
  url: `/ponto/${timestamp}`,
  options: {
    method: 'GET',
  },
})

const month: (m: number) => Endpoint = (m) => ({
  url: `/ponto/mes/${m}`,
  options: {
    method: 'GET',
  },
})

export {
  day,
  month,
}
