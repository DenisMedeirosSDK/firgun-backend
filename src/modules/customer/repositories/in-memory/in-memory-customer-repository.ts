import { randomUUID } from 'node:crypto'

import { Customer, CustomerProps } from '../../entities/customer'
import { CustomerRepository } from '../customer-repository'

export class InMemoryCustomerRepository implements CustomerRepository {
  customers: CustomerProps[] = []
  async create ({ props }: Customer): Promise<CustomerProps> {
    const customer: CustomerProps = {
      id: randomUUID(),
      ...props
    }

    this.customers.push(customer)

    return customer
  }
}
