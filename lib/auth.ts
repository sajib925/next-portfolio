import bcrypt from 'bcrypt'
import { prisma } from './db'

const SALT_ROUNDS = 10

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS)
}

export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash)
}

export async function getAuthUser(email: string) {
  return prisma.user.findUnique({
    where: { email },
    select: {
      id: true,
      email: true,
      name: true,
      password: true,
      avatar: true,
      bio: true,
    },
  })
}

export async function createAuthSession(userId: string) {
  // This will be implemented with proper session management
  // For now, we'll use JWT or secure cookies in the API routes
  return userId
}
