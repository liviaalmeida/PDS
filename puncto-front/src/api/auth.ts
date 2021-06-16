function timeout(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

async function login(): Promise<unknown> {
  return await timeout(3000)
}

async function logout(): Promise<unknown> {
  return await timeout(1500)
}

export {
  login,
  logout,
}
