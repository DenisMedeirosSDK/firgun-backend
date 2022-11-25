import { NextFunction, Request, Response } from 'express'
import { prisma } from '../../shared/utils/prisma'

export async function ensureAdmin (
  request: Request,
  response: Response,
  next: NextFunction
) {
  // eslint-disable-next-line @typescript-eslint/naming-convention
  const { user_id } = request

  console.log(user_id)

  const account = await prisma.account.findUnique({
    where: {
      id: user_id
    }
  })

  if (account === null) {
    return response.status(401).json({
      error: 'Account not exits'
    })
  }

  if (account.isAdmin === true) {
    return next()
  }

  return response.status(401).json({
    error: 'Unauthorized'
  })
}
