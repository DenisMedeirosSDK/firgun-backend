import { Customer, CustomerProps } from '../entities/customer'

export interface UpdateCustomerContactRequest {
  id: string
  name: string
  lastName: string
  email: string
  phone: string
  phone1: string
  birthDate: string

  zipcode: string
  state: string
  city: string
  street: string
  streetNumber: string
  neighborhood: string

  docType: 'cpf' | 'cnpj'
  docNumber: string
}

export interface CustomerRepository {
  create(props: Customer): Promise<CustomerProps>
  list(): Promise<CustomerProps[]>
  findCustomerByEmail(email: string): Promise<CustomerProps | null >
  findCustomerById(id: string): Promise<CustomerProps | null >
  updateCustomer(data: UpdateCustomerContactRequest): Promise<void>
}
