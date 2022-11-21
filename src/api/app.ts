
import cors from 'cors'
import express, { NextFunction, Request, Response } from 'express'
import 'express-async-errors'
import helmet from 'helmet'
import { routes } from './routes'

const app = express()
app.use(express.json())
app.use(cors())
app.use(helmet())

app.get('/', (request: Request, response: Response) =>
  response.end('hello world')
)

app.use(routes)

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof Error) {
    return response.status(400).json({
      message: err.message
    })
  }

  return response.status(500).json({
    status: 'error',
    message: `Internal server error - ${err}`
  })
})

export { app }
