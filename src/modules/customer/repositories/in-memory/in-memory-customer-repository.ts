import { randomUUID } from 'node:crypto'

import { Customer, CustomerProps } from '../../entities/customer'
import { CustomerRepository, UpdateCustomerContactRequest } from '../customer-repository'

export class InMemoryCustomerRepository implements CustomerRepository {
  private readonly customers: CustomerProps[] = []
  async findDocument (docNumber: string): Promise<CustomerProps | null> {
    const customerExist = this.customers.find(customer => customer.document.docNumber === docNumber)

    if (customerExist === undefined) return null

    return customerExist
  }

  async findCustomerById (id: string): Promise<CustomerProps | null> {
    const customerExist = this.customers.find(customer => customer.id === id)

    if (customerExist === undefined) return null

    return customerExist
  }

  async updateCustomer (data: UpdateCustomerContactRequest): Promise<void> {
    const customerFormmated: CustomerProps = {
      id: data.id,
      name: data.name,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      phone1: data.phone1,
      birthDate: new Date(data.birthDate),
      address: {
        city: data.city,
        neighborhood: data.neighborhood,
        state: data.state,
        street: data.street,
        streetNumber: data.streetNumber,
        zipcode: data.zipcode
      },
      document: {
        docNumber: data.docNumber,
        docType: data.docType
      }
    }
    const findIndex = this.customers.findIndex(customer => customer.id === customerFormmated.id)

    this.customers[findIndex].name = customerFormmated.name
    this.customers[findIndex].lastName = customerFormmated.lastName
    this.customers[findIndex].lastName = customerFormmated.lastName
    this.customers[findIndex].email = customerFormmated.email
    this.customers[findIndex].birthDate = customerFormmated.birthDate
    this.customers[findIndex].phone = customerFormmated.phone
    this.customers[findIndex].phone1 = customerFormmated.phone1
    this.customers[findIndex].document = customerFormmated.document
    this.customers[findIndex].address = customerFormmated.address
  }

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
