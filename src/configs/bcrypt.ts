import bycrypt from "bcrypt"

export const saltRounds = 10

export const hashPassword = async (password: string) => {
  const salt = await bycrypt.genSalt(saltRounds)
  const hash = await bycrypt.hash(password, salt)

  return hash
}

export const comparePassword = async (password: string, hash: string) => {
  const match = await bycrypt.compare(password, hash)

  return match
}