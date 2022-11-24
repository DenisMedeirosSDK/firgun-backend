import 'dotenv/config'
import 'reflect-metadata'
import '../shared/container'

import http from 'node:http'
import { prisma } from '../shared/utils/prisma'
import { app } from './app'

const PORT = process.env.PORT ?? 3000

const server = http.createServer(app).listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})

process.on('uncaughtException', (error, origin) => {
  console.log(`\n${origin} signal received. \n${error}`)
})

process.on('unhandledRejection', (error) => {
  console.log(`\nunhandledRejection signal received. \n${error}`)
})

function gracefulShutdown (event: string) {
  return (code: number) => {
    console.log(`${event} received! with ${code}`)
    server.close(async () => {
      await prisma.$disconnect()
      console.log(`Closed express server with exit code ${code}`)
      process.exit(code)
    })
  }
}

process.on('SIGINT', gracefulShutdown('SIGINT'))

process.on('SIGTERM', gracefulShutdown('SIGTERM'))

process.on('exit', (code) => {
  console.log(`About to exit with code ${code}`)
})
