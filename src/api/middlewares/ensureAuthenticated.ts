import { NextFunction, Request, Response } from 'express'
import { verify } from 'jsonwebtoken'
import { CONFIGS } from '../../config'

interface IPayload {
  sub: string
}

export function ensureAuthenticated (
  request: Request,
  response: Response,
  next: NextFunction
) {
  const authToken = request.headers.authorization

  if (authToken === undefined) {
    return response.status(401).end()
  }

  const [, token] = authToken.split(' ')

  try {
    const { sub } = verify(token, CONFIGS.JWT_SECRET) as IPayload

    request.user_id = sub
    return next()
  } catch (error) {
    return response.status(401).end()
  }
}
