import { container } from 'tsyringe'
import { z, ZodError } from 'zod'
import { STATUS_CODES } from '../../../../shared/utils/statusCode'
import { UpdateCustomerContactUseCase } from './update-customer-contact-use-case'

const schemaParam = z.object({
  customerId: z.string()
})

const schemaBody = z.object({
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
  docType: z.enum(['cpf', 'cnpj'])
})

export class UpdateCustomerContact {
  async handle (request: any, response: any) {
    const { customerId } = schemaParam.parse(request.params)
    const data = schemaBody.parse(request.body)

    try {
      const newData = {
        id: customerId,
        ...data
      }

      console.log(newData)

      const updateCustomerContactUseCase = container.resolve(UpdateCustomerContactUseCase)

      const result = await updateCustomerContactUseCase.execute(newData)

      return response.status(200).json(result)
    } catch (error) {
      if (error instanceof ZodError) {
        return response.status(STATUS_CODES.BAD_REQUEST_400).json(error)
      }
    }
  }
}
