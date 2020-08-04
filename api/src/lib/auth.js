import fs from 'fs'

import jwt from 'jsonwebtoken'
import SecurePassword from 'secure-password'
import { AuthenticationError } from '@redwoodjs/api'

import {
  findUserByEmail,
  updatePassword,
  verifyPassword,
} from 'src/services/users/users'

export const authenticateUser = async (email, password) => {
  const user = await findUserByEmail(email)

  if (!user || !user.password) throw new AuthenticationError()

  switch (await verifyPassword(user.password, password)) {
    case SecurePassword.VALID:
      break
    case SecurePassword.VALID_NEEDS_REHASH:
      updatePassword(user.id, password)
      break
    default:
      throw new AuthenticationError()
  }

  delete user.password

  var appDir = process.cwd()
  const privateKey = fs.readFileSync(appDir + '/../jwt.key', 'utf8')

  return jwt.sign(user, privateKey, {
    algorithm: 'RS256',
  })
}

export const getCurrentUser = async (decoded, { token, type }) => {
  const appDir = process.cwd()
  const publicKey = fs.readFileSync(appDir + '/../jwt.key.pub', 'utf8')

  return jwt.verify(token, publicKey)
}

export const requireAuth = () => {
  if (!context.currentUser) {
    throw new AuthenticationError("You don't have permission to do that.")
  }
}
