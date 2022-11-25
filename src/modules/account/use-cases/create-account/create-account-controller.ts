import { container } from 'tsyringe'
import { z, ZodError } from 'zod'
import { CreateAccountUserUseCase } from './create-account-use-case'

const schema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  isAdmin: z.boolean().optional()
})

export class CreateAccountController {
  async handle (request: any, response: any) {
    const { email, password, isAdmin } = schema.parse(request.body)

    try {
      const accountUseCase = container.resolve(CreateAccountUserUseCase)

      await accountUseCase.execute({ email, password, isAdmin })
    } catch (error) {
      if (error instanceof ZodError) {
        return response.json(error)
      }
    }

    return response.end()
  }
}
