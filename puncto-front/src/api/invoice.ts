import { Endpoint } from '.'

const all: Endpoint = {
  url: '/invoice',
  method: 'GET',
}

const create: Endpoint = {
  url: '/invoice',
  method: 'POST',
}

const get: (id: string) => Endpoint = (id) => ({
  url: `/invoice/${id}`,
  method: 'GET',
})

export {
  all,
  create,
  get,
}
