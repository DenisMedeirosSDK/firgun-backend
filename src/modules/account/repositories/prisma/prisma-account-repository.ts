import { prisma } from '../../../../shared/utils/prisma'
import { AccountProps } from '../../entities/account'
import { AccountRepository } from '../account-repository'

export class PrismaAccountRepository implements AccountRepository {
  async create (data: AccountProps): Promise<void> {
    await prisma.account.create({
      data: {
        email: data.email,
        password: data.password,
        isAdmin: data.isAdmin
      }
    })
  }

  async findByEmail (email: string): Promise<AccountProps | null> {
    const account = await prisma.account.findUnique({
      where: {
        email
      }
    })

    if (account !== null) {
      return account
    }

    return null
  }
}
