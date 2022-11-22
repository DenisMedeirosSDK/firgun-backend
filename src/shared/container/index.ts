import { container } from 'tsyringe'

import { CustomerRepository } from '../../modules/customer/repositories/customer-repository'
import { InMemoryCustomerRepository } from '../../modules/customer/repositories/in-memory/in-memory-customer-repository'

import { InMemorySurveyRepository } from '../../modules/customer/repositories/in-memory/in-memory-survey-repository'
import { SurveyRepository } from '../../modules/customer/repositories/survey-repository'

container.registerSingleton<CustomerRepository>('CustomerRepository', InMemoryCustomerRepository)
container.registerSingleton<SurveyRepository>('SurveyRepository', InMemorySurveyRepository)
