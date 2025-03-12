import { expect, describe, it } from 'vitest'
import { RegisterUsers } from './registerUser'
import { compare } from 'bcryptjs'
import { InMemoryUsersRepository } from '../../repositories/users/in-memony-users-repository'
import { UserEmailAlreadyExistsError } from './errors/user-email-already-exists-error'

describe('Register use case', () => {
  it('should hash user password upon registration', async () => {
    // Users Repository MOCK
    const userRepositoryMock = new InMemoryUsersRepository()

    const registerUseCase = new RegisterUsers(userRepositoryMock)

    const fakeData = {
      name: 'johnathan',
      email: 'johnathan@google.com',
      password: '12345678',
      cep: '019281210',
      cpf_cnpj: '129291910029',
      is_active: true,
    }

    const { user } = await registerUseCase.execute(fakeData)

    const isPasswordCorretlyHashed = await compare(
      fakeData.password,
      user.password_hash,
    )

    expect(isPasswordCorretlyHashed).toBe(true)
  })

  it('should not to be able to register with same email type', async () => {
    const userRepositoryMock = new InMemoryUsersRepository()
    const registerUseCase = new RegisterUsers(userRepositoryMock)

    const fakeEmail = 'johnathan@google.com'

    const fakeData = {
      name: 'johnathan',
      email: fakeEmail,
      password: '12345678',
      cep: '019281210',
      cpf_cnpj: '129291910029',
      is_active: true,
    }

    await registerUseCase.execute(fakeData)

    expect(() => registerUseCase.execute(fakeData)).rejects.toBeInstanceOf(
      UserEmailAlreadyExistsError,
    )
  })
})
