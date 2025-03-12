/* eslint-disable prettier/prettier */
import { compare } from 'bcryptjs'
import { UsersRepository } from '../../repositories/users/users-repository'
import { InvalidCredentialsError } from './errors/invalid-credentials-error'
import { AuthenticateUseCaseRequest } from './dtos/authenticateUserDto'
import { AuthenticateUserCaseResponse } from './dtos/authenticateUserResponse'

export class AuthenticateUseCase {
  constructor(private usersRepository: UsersRepository) { }

  // auth a user
  async execute({
    email,
    password,
  }: AuthenticateUseCaseRequest): Promise<AuthenticateUserCaseResponse> {

    const user = await this.usersRepository.findByEmail(email)

    if (!user) {
      throw new InvalidCredentialsError()
    }

    const doesPasswordsMatch = await compare(password, user.password_hash)

    if (!doesPasswordsMatch) {
      throw new InvalidCredentialsError()
    }

    return {
      user,
    }
  }
}
