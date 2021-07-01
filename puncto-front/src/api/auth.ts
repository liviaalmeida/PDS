import { Endpoint } from '.'

const login: Endpoint = {
  url: '/login',
  options: {
    method: 'POST',
  },
}

const logout: Endpoint = {
  url: '/logout',
  options: {
    method: 'POST',
  },
}

const signup: Endpoint = {
  url: '/signup',
  options: {
    method: 'POST',
  },
}

export {
  login,
  logout,
  signup,
}
