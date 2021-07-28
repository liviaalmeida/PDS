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

const userData: Endpoint = {
  url: '/user',
  options: {
    method: 'GET',
  },
}

export {
  login,
  logout,
  signup,
  userData,
}
