import { Endpoint } from "."

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

export {
  login,
  logout,
}
