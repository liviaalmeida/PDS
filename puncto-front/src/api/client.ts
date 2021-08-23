import { Endpoint } from '.'

const create: Endpoint = {
  url: '/cliente',
  options: {
    method: 'POST',
  },
}

const get: Endpoint = {
  url: '/cliente',
  options: {
    method: 'GET',
  },
}

export {
  create,
  get,
}
