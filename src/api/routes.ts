import { accountRoutes } from '@/modules/account/routes/account.routes'
import { Router } from 'express'
import { customerRoutes } from '../modules/customer/routes/customer.routes'

export const routes = Router()

routes.use(customerRoutes)
routes.use(accountRoutes)
