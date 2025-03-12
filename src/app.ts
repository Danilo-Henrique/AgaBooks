/* eslint-disable camelcase */
import fastify from 'fastify'

import { appRoutes } from './http/routes'

import { ZodError } from 'zod'
import { env } from './env'

import cors from '@fastify/cors'

export const app = fastify()

app.register(cors, {
  origin: 'http://localhost:5173', // Defina a origem do seu front-end
  methods: ['GET', 'POST', 'PUT', 'DELETE'], // Métodos permitidos
})

app.register(appRoutes)

app.setErrorHandler((error, _, reply) => {
  // Se for erro de validação de dados
  if (error instanceof ZodError) {
    return reply
      .code(400)
      .send({ message: 'Validation error.', issue: error.format() })
  }

  if (env.NODE_ENV !== 'prod') {
    console.error(error)
  }
  // Datalog / NewRelic /Sentry

  reply.code(500).send({ message: 'Internal server error.' })
})
