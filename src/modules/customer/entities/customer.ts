export interface CustomerProps {
  id?: string
  name: string
  lastName: string
  email: string
  phone: string
  phone1: string
  birthDate: Date

  address: {
    zipcode: string
    state: string
    city: string
    street: string
    streetNumber: string
    neighborhood: string
  }

  document: {
    docType: 'cpf' | 'cnpj'
    docNumber: string
  }
}

export class Customer {
  props: CustomerProps

  constructor (props: CustomerProps) {
    this.props = props
  }
}
