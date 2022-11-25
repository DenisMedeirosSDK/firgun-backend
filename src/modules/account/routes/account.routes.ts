import { Router } from 'express'
import { AuthenticateController } from '../use-cases/authenticate/authenticate-controller'
import { CreateAccountController } from '../use-cases/create-account/create-account-controller'

const createAccountController = new CreateAccountController()
const authenticateController = new AuthenticateController()

export const accountRoutes = Router()

accountRoutes.post('/account', createAccountController.handle)
accountRoutes.post('/auth', authenticateController.handle)
