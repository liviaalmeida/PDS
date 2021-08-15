import { Endpoint } from '.'

const get: Endpoint = {
  url: '/user',
  options: {
    method: 'GET',
  },
}

const update: Endpoint = {
  url: '/user',
  options: {
    method: 'PUT',
  },
}

export {
  get,
  update,
}
