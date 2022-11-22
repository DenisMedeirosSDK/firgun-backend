import { inject, injectable } from 'tsyringe'
import { validationCnpjCpf } from '../../../../shared/utils/validation-cpf-cnpj'
import { Customer } from '../../entities/customer'
import { Survey } from '../../entities/survey'
import { CustomerRepository } from '../../repositories/customer-repository'
import { SurveyRepository } from '../../repositories/survey-repository'
interface CreateCustomerContactRequest {
  customer: Customer
  surveys: Array<{
    question: string
    answer: string
  }>
}

@injectable()
export class CreateCustomerContactUseCase {
  constructor (
    @inject('CustomerRepository')
    private readonly customerRepository: CustomerRepository,

    @inject('SurveyRepository')
    private readonly surveysRepository: SurveyRepository
  ) {}

  async execute ({ customer, surveys }: CreateCustomerContactRequest): Promise<CreateCustomerContactRequest | Object> {
    const verifyDocument = validationCnpjCpf(customer.props.document.docType,
      customer.props.document.docNumber)

    if (verifyDocument === false || verifyDocument === undefined) {
      return { message: 'Error document not valid' }
    }

    const client = await this.customerRepository.create(customer)

    if (client.id !== undefined) {
      surveys.map(async (survey) => {
        const newSurvey: Survey = {
          props: {
            question: survey.question,
            answer: survey.answer,
            customerId: client.id as string
          }
        }

        await this.surveysRepository.create(newSurvey)
      })
    }

    return {
      customer,
      surveys
    }
  }
}
