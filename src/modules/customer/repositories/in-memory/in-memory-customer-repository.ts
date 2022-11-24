import { randomUUID } from 'node:crypto'

import { Customer, CustomerProps } from '../../entities/customer'
import { CustomerRepository } from '../customer-repository'

export class InMemoryCustomerRepository implements CustomerRepository {
  private readonly customers: CustomerProps[] = []
  async findCustomerByEmail (email: string): Promise<CustomerProps | null> {
    const customerExist = this.customers.find(customer => customer.email === email)

    if (customerExist === undefined) return null

    return customerExist
  }

  async list (): Promise<CustomerProps[]> {
    return this.customers
  }

  async create ({ props }: Customer): Promise<CustomerProps> {
    const customer: CustomerProps = {
      id: randomUUID(),
      ...props
    }

    this.customers.push(customer)

    return customer
  }
}
