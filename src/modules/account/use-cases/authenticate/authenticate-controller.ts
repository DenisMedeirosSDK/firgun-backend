import { container } from 'tsyringe'
import { z } from 'zod'
import { AuthenticateUserUseCase } from './authenticate-use-case'

const schema = z.object({
  email: z.string().email(),
  password: z.string()
})

export class AuthenticateController {
  async handle (request: any, response: any) {
    const { email, password } = schema.parse(request.body)
    const accountUseCase = container.resolve(AuthenticateUserUseCase)

    const token = await accountUseCase.execute({ email, password })

    return response.json({ token })
  }
}
