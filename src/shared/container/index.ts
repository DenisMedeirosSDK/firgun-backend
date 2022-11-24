import { container } from 'tsyringe'

import { CustomerRepository } from '../../modules/customer/repositories/customer-repository'
// import { InMemoryCustomerRepository } from '../../modules/customer/repositories/in-memory/in-memory-customer-repository'
import { PrismaCustomerRepository } from '../../modules/customer/repositories/prisma/prisma-customer-repository'

// import { InMemorySurveyRepository } from '../../modules/customer/repositories/in-memory/in-memory-survey-repository'
import { PrismaSurveyRepository } from '../../modules/customer/repositories/prisma/prisma-survey-repository'
import { SurveyRepository } from '../../modules/customer/repositories/survey-repository'

container.registerSingleton<CustomerRepository>('CustomerRepository', PrismaCustomerRepository)
container.registerSingleton<SurveyRepository>('SurveyRepository', PrismaSurveyRepository)
