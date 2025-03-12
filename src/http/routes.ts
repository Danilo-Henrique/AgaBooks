import { FastifyInstance } from 'fastify'
import { registerNewUser } from './controllers/user.controller'
import { authenticate } from './controllers/authentication.controller'

export async function appRoutes(app: FastifyInstance) {
  // Rota de cadastro de um usuário
  app.post('/users', registerNewUser)

  app.post('/sessions', authenticate)
}
