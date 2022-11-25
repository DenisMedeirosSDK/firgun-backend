import { container } from 'tsyringe'
import { ListCustomerContactUseCase } from './list-customer-contact-use-case'

export class ListCustomerContactController {
  async handle (request: any, response: any) {
    const listCustomerContactUseCase = container.resolve(ListCustomerContactUseCase)

    const result = await listCustomerContactUseCase.execute()

    return response.status(200).json(result)
  }
}
