import { Router } from 'express'
import { CreateCustomerContactCotroller } from '../use-cases/create-customer-contact/create-customer-contact-controller'
import { ListCustomerContactController } from '../use-cases/list-customer-contact/list-customer-contact-controller'

export const customerRoutes = Router()

const createCustomerContactCotroller = new CreateCustomerContactCotroller()
const listCustomerContactController = new ListCustomerContactController()

customerRoutes.post('/customer/contact', createCustomerContactCotroller.handle)
customerRoutes.get('/customer/contacts', listCustomerContactController.handle)
