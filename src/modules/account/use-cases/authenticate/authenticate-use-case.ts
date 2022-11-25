import { compare } from 'bcrypt'
import { sign } from 'jsonwebtoken'
import { inject, injectable } from 'tsyringe'
import { CONFIGS } from '../../../../config'
import { AccountRepository } from '../../repositories/account-repository'

interface IAuthenticateRequest {
  email: string
  password: string
}

@injectable()
export class AuthenticateUserUseCase {
  constructor (
    @inject('AccountRepository')
    private readonly accountRepository: AccountRepository
  ) {}

  async execute ({ email, password }: IAuthenticateRequest) {
    const user = await this.accountRepository.findByEmail(email)

    if (user === null) {
      throw new Error('Email/Password incorrect')
    }

    const passwordMatch = await compare(password, user.password)

    if (!passwordMatch) {
      throw new Error('Email/Password incorrect')
    }

    const token = sign(
      {
        email: user.email
      },
      CONFIGS.JWT_SECRET,
      {
        subject: user.id,
        expiresIn: '1d'
      }
    )

    return token
  }
}
