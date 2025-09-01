import bcrypt from "bcryptjs"

const ROUNDS = 12

export async function hashPassword(pw: string) {
  return bcrypt.hash(pw, ROUNDS)
}

export async function verifyPassword(pw: string, hash: string) {
  return bcrypt.compare(pw, hash)
}
