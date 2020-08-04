import { authenticateUser } from 'src/lib/auth'

import { createUser, findUserByEmail } from 'src/services/users/users'

export const login = async ({ email, password }) => {
  return authenticateUser(email, password)
}

export const signup = async ({ input: { email, password } }) => {
  const existing = await findUserByEmail(email)

  if (existing) {
    throw 'signup error'
  }

  return createUser({
    email,
    password,
  })
}
