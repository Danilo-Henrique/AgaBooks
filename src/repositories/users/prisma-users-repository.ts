import { prisma } from '../../lib/prisma'
import { Prisma } from '@prisma/client'
import { UsersRepository } from './users-repository'

export class PrismaUsersRepository implements UsersRepository {
  // função para criar um novo usuário
  async create(data: Prisma.UserCreateInput) {
    const user = await prisma.user.create({
      data,
    })

    // usuário que acabou de ser inserido no banco
    return user
  }

  // função para buscar um usuário por email
  async findByEmail(email: string) {
    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    })

    return user
  }
}
