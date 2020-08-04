import SecurePassword from 'secure-password'

import { db } from 'src/lib/db'

const securePassword = new SecurePassword()

export const createUser = (data) => {
  const hashedPassword = hashPassword(data.password)
  return db.user.create({ data: { ...data, password: hashedPassword } })
}

export const findUserByEmail = (email) => {
  return db.user.findOne({
    where: {
      email,
    },
  })
}

const hashPassword = (password) => {
  return securePassword.hashSync(Buffer.from(password)).toString('base64')
}

export const updatePassword = (id, password) => {
  const hashedPassword = hashPassword(password)

  return db.user.update({
    where: { id },
    data: { password: hashedPassword },
  })
}

export const verifyPassword = (hashedPassword, password) => {
  return securePassword.verifySync(
    Buffer.from(password),
    Buffer.from(hashedPassword, 'base64')
  )
}
