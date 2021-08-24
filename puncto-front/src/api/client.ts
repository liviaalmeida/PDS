import { Endpoint } from '.'

const create: Endpoint = {
  url: '/cliente',
  method: 'POST',
}

const get: Endpoint = {
  url: '/cliente',
  method: 'GET',
}

const remove: (id: string) => Endpoint = (id) => ({
  url: `/cliente/${id}`,
  method: 'DELETE',
})

const update: Endpoint = {
  url: '/cliente',
  method: 'PUT',
}

export {
  create,
  get,
  remove,
  update,
}
