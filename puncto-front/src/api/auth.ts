import { Endpoint } from '.'

const login: Endpoint = {
  url: '/login',
  method: 'POST',
}

const logout: Endpoint = {
  url: '/logout',
  method: 'POST',
}

const signup: Endpoint = {
  url: '/signup',
  method: 'POST',
}

export {
  login,
  logout,
  signup,
}
