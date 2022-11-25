import { hash } from 'bcrypt'
import { inject, injectable } from 'tsyringe'
import { AccountRepository } from '../../repositories/account-repository'

interface CreateAccountRequest {
  email: string
  password: string
  isAdmin?: boolean
}

@injectable()
export class CreateAccountUserUseCase {
  constructor (
    @inject('AccountRepository')
    private readonly accountRepository: AccountRepository
  ) {}

  async execute ({ email, password, isAdmin = false }: CreateAccountRequest) {
    const user = await this.accountRepository.findByEmail(email)

    console.log(email, password)

    if (user?.email === email) {
      throw new Error('Account already exists')
    }

    const passwordHash = await hash(password, 8)

    await this.accountRepository.create({
      email,
      password: passwordHash,
      isAdmin
    })
  }
}
