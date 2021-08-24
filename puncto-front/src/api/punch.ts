import { Endpoint } from '.'

const create: Endpoint = {
  url: '/ponto',
  method: 'POST',
}

const remove: (id: string) => Endpoint = (id) => ({
  url: `/ponto/${id}`,
  method: 'DELETE',
})

const save: Endpoint = {
  url: '/ponto',
  method: 'PUT',
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
  remove,
  save,
  day,
  month,
}
