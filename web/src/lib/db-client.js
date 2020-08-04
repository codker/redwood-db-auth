import jwt from 'jsonwebtoken'

export class DBClient {
  type = 'custom'

  async login(options) {
    const response = await window.fetch(
      `${window.__REDWOOD__API_PROXY_PATH}/graphql`,
      {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          query: `query __REDWOOD__AUTH_LOGIN { login(email: "${options.email}", password: "${options.password}") }`,
        }),
      }
    )

    if (response.ok) {
      const { data, errors } = await response.json()

      if (errors) {
        throw 'login-error'
      }

      if (data?.login) {
        localStorage.setItem('jwt', data.login)
      }
    } else {
      throw 'login-error'
    }
  }
  logout() {
    localStorage.removeItem('jwt')
  }
  getToken() {
    return localStorage.getItem('jwt')
  }
  getUserMetadata() {
    const token = localStorage.getItem('jwt')
    return token ? jwt.decode(token) : null
  }
}
