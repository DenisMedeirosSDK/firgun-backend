import { AccountProps } from '../entities/account'

export interface AccountRepository {
  create(data: AccountProps): Promise<void>
  findByEmail(email: string): Promise<AccountProps | null>
}
