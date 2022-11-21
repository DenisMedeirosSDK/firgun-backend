import { InMemoryCustomerRepository } from '../repositories/in-memory/in-memory-customer-repository'
import { InMemorySurveyRepository } from '../repositories/in-memory/in-memory-survey-repository'
import { CreateCustomerContactUseCase } from '../use-cases/create-customer-contact/create-customer-contact-use-case'

export const makeCreateCustomerContactFactory = () => {
  const customerRepository = new InMemoryCustomerRepository()
  const surveyRepository = new InMemorySurveyRepository()
  return new CreateCustomerContactUseCase(customerRepository, surveyRepository)
}
