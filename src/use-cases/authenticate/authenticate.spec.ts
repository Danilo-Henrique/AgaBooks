import { expect, describe, it } from 'vitest'
import { hash } from 'bcryptjs'
import { InMemoryUsersRepository } from '../../repositories/users/in-memony-users-repository'
import { AuthenticateUseCase } from './authenticate'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'

describe('Authenticate use case', () => {
  it('should be able to authenticate', async () => {
    // Users Repository MOCK
    const userRepositoryMock = new InMemoryUsersRepository()

    const authenticateUseCase = new AuthenticateUseCase(userRepositoryMock)

    const fakeData = {
      email: 'antonio.impacta@google.com',
      password: '123456',
    }

    // criando o usuário para login

    userRepositoryMock.create({
      name: 'Antonio',
      cpf_cnpj: '8127171228182',
      cep: '9291929191',
      email: 'antonio.impacta@google.com',
      password_hash: await hash('123456', 6),
      is_active: true,
    })

    const { user } = await authenticateUseCase.execute(fakeData)

    expect(user.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with different email', async () => {
    // Users Repository MOCK
    const userRepositoryMock = new InMemoryUsersRepository()

    const authenticateUseCase = new AuthenticateUseCase(userRepositoryMock)

    const fakeData = {
      email: 'jhonatan@google.com',
      password: '123456',
    }

    userRepositoryMock.create({
      name: 'Antonio',
      cpf_cnpj: '8127171228182',
      cep: '9291929191',
      email: 'antonio.impacta@google.com',
      password_hash: await hash('123456', 6),
      is_active: true,
    })

    expect(() => authenticateUseCase.execute(fakeData)).rejects.toBeInstanceOf(
      InvalidCredentialsError,
    )
  })

  it('should not be able to authenticate with wrong password', async () => {
    // Users Repository MOCK
    const userRepositoryMock = new InMemoryUsersRepository()

    const authenticateUseCase = new AuthenticateUseCase(userRepositoryMock)

    const fakeData = {
      email: 'jhonatan@google.com',
      password: '123456',
    }

    userRepositoryMock.create({
      name: 'Antonio',
      cpf_cnpj: '8127171228182',
      cep: '9291929191',
      email: 'antonio.impacta@google.com',
      password_hash: await hash('654321', 6),
      is_active: true,
    })

    expect(() => authenticateUseCase.execute(fakeData)).rejects.toBeInstanceOf(
      InvalidCredentialsError,
    )
  })
})
