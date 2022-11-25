import { CustomerRepository } from '../../repositories/customer-repository'

import { inject, injectable } from 'tsyringe'

@injectable()
export class ListCustomerContactUseCase {
  constructor (
    @inject('CustomerRepository')
    private readonly customerRepository: CustomerRepository
  ) {}

  async execute () {
    const customers = await this.customerRepository.list()

    return {
      customers
    }
  }
}
