import { Router } from 'express'
import { ensureAdmin } from '../../../api/middlewares/ensureAdmin'
import { ensureAuthenticated } from '../../../api/middlewares/ensureAuthenticated'
import { CreateCustomerContactCotroller } from '../use-cases/create-customer-contact/create-customer-contact-controller'
import { ListCustomerContactController } from '../use-cases/list-customer-contact/list-customer-contact-controller'
import { UpdateCustomerContact } from '../use-cases/update-customer-contact/update-customer-contact-controller'

export const customerRoutes = Router()

const createCustomerContactCotroller = new CreateCustomerContactCotroller()
const listCustomerContactController = new ListCustomerContactController()
const updateCustomerContact = new UpdateCustomerContact()

customerRoutes.post('/customer/contact', createCustomerContactCotroller.handle)
customerRoutes.get('/customer/contacts', ensureAuthenticated, listCustomerContactController.handle)
customerRoutes.put('/customer/:customerId/contact', ensureAuthenticated, ensureAdmin, updateCustomerContact.handle)
