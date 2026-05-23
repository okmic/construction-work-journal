import fastify from "fastify"
import formBody from "@fastify/formbody"
import cors from '@fastify/cors'
import appconfig from "../pkg/config/appconfig"
import { setupGlobalErrorHandlers } from "../pkg/errors/error-handler"
import appInstance from "../pkg/appInstance/appInstance"
import PingModule from "../modules/ping/ping.module"
import errorMiddleware from "../pkg/errors/error.middleware"
import { WorkFact } from "../model/workFact.model"
import { initializeDatabase } from "../pkg/db/db.init"

(async () => {
  const server = fastify({ logger: true })
  await server.register(formBody)
  await server.register(cors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  })
  appInstance.setApp(server)
  new PingModule(server)
  new WorkFact(server)
  server.setErrorHandler(errorMiddleware)
  
  try {
    setupGlobalErrorHandlers()
    await initializeDatabase()
    await server.listen({
      port: appconfig.PORT,
      host: '0.0.0.0'
    })
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
})()

