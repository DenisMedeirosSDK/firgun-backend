export interface AccountProps {
  id?: string
  email: string
  password: string
  isAdmin?: boolean | null
}

export class Account {
  props: AccountProps

  constructor (props: AccountProps) {
    this.props = props
  }
}
