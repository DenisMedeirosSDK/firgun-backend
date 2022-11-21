import { Router } from 'express'
import { CreateCustomerContactCotroller } from '../use-cases/create-customer-contact/create-customer-contact-controller'

export const customerRoutes = Router()

const createCustomerContactCotroller = new CreateCustomerContactCotroller()

customerRoutes.post('/customer/contact', createCustomerContactCotroller.handle)
