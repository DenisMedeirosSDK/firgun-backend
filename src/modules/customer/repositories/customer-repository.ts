import { Customer, CustomerProps } from '../entities/customer'

export interface CustomerRepository {
  create(props: Customer): Promise<CustomerProps>
  list(): Promise<CustomerProps[]>
  findCustomerByEmail(email: string): Promise<CustomerProps | null >
}
