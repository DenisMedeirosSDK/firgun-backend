import { Customer, CustomerProps } from '../entities/customer'

export interface CustomerRepository {
  create(props: Customer): Promise<CustomerProps>
  list(): Promise<CustomerProps[]>
}
