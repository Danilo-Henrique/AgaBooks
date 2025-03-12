import { FastifyReply, FastifyRequest } from 'fastify'

import { z } from 'zod'

import { RegisterUsers } from '../../use-cases/users/registerUser'
import { PrismaUsersRepository } from '../../repositories/users/prisma-users-repository'
import { UserEmailAlreadyExistsError } from '../../use-cases/users/errors/user-email-already-exists-error'

export async function registerNewUser(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const registerBodySchema = z.object({
    name: z.string(),
    cpf_cnpj: z.string().min(11),
    cep: z.string().min(8),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, cpf_cnpj, cep, email, password } = registerBodySchema.parse(
    request.body,
  )

  const is_active = true

  try {
    // Instanciando a dependência
    const prismaUserRepository = new PrismaUsersRepository()

    // Injetando a dependência
    const registerUseCase = new RegisterUsers(prismaUserRepository)

    // Usando o caso de uso
    await registerUseCase.execute({
      name,
      cpf_cnpj,
      cep,
      email,
      password,
      is_active,
    })
  } catch (err) {
    // console.error(err)

    if (err instanceof UserEmailAlreadyExistsError) {
      reply.code(409).send({ message: err.message })
    }

    throw err
  }

  return reply.code(201).send()
}
