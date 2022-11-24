import { inject, injectable } from 'tsyringe'
import { validationCnpjCpf } from '../../../../shared/utils/validation-cpf-cnpj'
import { CustomerRepository } from '../../repositories/customer-repository'

export interface PropsRequest {
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

@injectable()
export class UpdateCustomerContactUseCase {
  constructor (
    @inject('CustomerRepository')
    private readonly customerRepository: CustomerRepository
  ) {}

  async execute (data: PropsRequest) {
    const verifyDocument = validationCnpjCpf(data.docType, data.docNumber)

    if (verifyDocument === false || verifyDocument === undefined) {
      return { message: 'Error document not valid' }
    }

    if (data.id !== undefined) {
      const customer = await this.customerRepository.findCustomerById(data.id)

      if ((customer?.id) !== null) {
        await this.customerRepository.updateCustomer(data)
      }
    }
  }
}
