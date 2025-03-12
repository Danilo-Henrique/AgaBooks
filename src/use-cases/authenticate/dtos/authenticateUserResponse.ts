import { User } from '@prisma/client'

export interface AuthenticateUserCaseResponse {
  user: User
}
