import { z, ZodError } from 'zod'
import { STATUS_CODES } from '../../../../shared/utils/statusCode'
import { Customer } from '../../entities/customer'
import { makeCreateCustomerContactFactory } from '../../factories/create-customer-contact-factory'

const schema = z.object({
  name: z.string(),
  lastName: z.string(),
  email: z.string().email(),
  birthDate: z.string(),
  phone: z.string(),
  phone1: z.string(),
  city: z.string(),
  neighborhood: z.string(),
  state: z.string(),
  street: z.string(),
  streetNumber: z.string(),
  zipcode: z.string(),
  docNumber: z.string(),
  docType: z.enum(['cpf', 'cnpj']),
  surveys: z.object({
    question: z.string(),
    answer: z.string()
  }).array()
})

export class CreateCustomerContactCotroller {
  async handle (request: any, response: any): Promise<any> {
    try {
      const {
        name, lastName, email, birthDate, phone, phone1,
        city, neighborhood, state, street, streetNumber, zipcode,
        docNumber, docType, surveys
      } = schema.parse(request.body)

      const customer: Customer = {
        props: {
          name,
          lastName,
          email,
          birthDate: new Date(birthDate),
          phone,
          phone1,
          address: {
            city, neighborhood, state, street, streetNumber, zipcode
          },
          document: {
            docType,
            docNumber
          }
        }
      }

      const factory = makeCreateCustomerContactFactory()

      const usecase = await factory.execute({ customer, surveys })

      return response.status(STATUS_CODES.CREATED_201).json(usecase)
    } catch (error) {
      if (error instanceof ZodError) {
        return response.status(STATUS_CODES.BAD_REQUEST_400).json(error)
      }
    }

    return response.status(STATUS_CODES.INTERNAL_SERVER_ERROR_500).end()
  }
}
