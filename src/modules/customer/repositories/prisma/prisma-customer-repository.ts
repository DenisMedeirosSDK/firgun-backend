import { prisma } from '../../../../shared/utils/prisma'
import { Customer, CustomerProps } from '../../entities/customer'
import { CustomerRepository, UpdateCustomerContactRequest } from '../customer-repository'

export class PrismaCustomerRepository implements CustomerRepository {
  async findDocument (docNumber: string): Promise<CustomerProps | null> {
    const customer = await prisma.customer.findFirst({
      where: {
        docNumber
      }
    })

    if (customer !== null) {
      const customerFormmated: CustomerProps = {
        id: customer.id,
        name: customer.name,
        lastName: customer.lastName,
        email: customer.email,
        phone: customer.phone,
        phone1: customer.phone1,
        birthDate: new Date(customer.birthDate),
        address: {
          city: customer.city,
          neighborhood: customer.neighborhood,
          state: customer.state,
          street: customer.street,
          streetNumber: customer.streetNumber,
          zipcode: customer.zipcode
        },
        document: {
          docNumber: customer.docNumber,
          docType: customer.docType
        }
      }

      return customerFormmated
    }

    return null
  }

  async findCustomerById (id: string): Promise<CustomerProps | null> {
    const customer = await prisma.customer.findFirst({
      where: {
        id
      }
    })

    if (customer !== null) {
      const customerFormmated: CustomerProps = {
        id: customer.id,
        name: customer.name,
        lastName: customer.lastName,
        email: customer.email,
        phone: customer.phone,
        phone1: customer.phone1,
        birthDate: new Date(customer.birthDate),
        address: {
          city: customer.city,
          neighborhood: customer.neighborhood,
          state: customer.state,
          street: customer.street,
          streetNumber: customer.streetNumber,
          zipcode: customer.zipcode
        },
        document: {
          docNumber: customer.docNumber,
          docType: customer.docType
        }
      }

      return customerFormmated
    }

    return null
  }

  async updateCustomer (data: UpdateCustomerContactRequest): Promise<void> {
    await prisma.customer.update({
      where: {
        id: data.id
      },
      data: {
        name: data.name,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        phone1: data.phone1,
        birthDate: new Date(data.birthDate),
        city: data.city,
        neighborhood: data.neighborhood,
        state: data.state,
        street: data.street,
        streetNumber: data.streetNumber,
        zipcode: data.zipcode,
        docNumber: data.docNumber,
        docType: data.docType
      }
    })
  }

  async findCustomerByEmail (email: string): Promise<CustomerProps | null> {
    const customerExist = await prisma.customer.findUnique({
      where: {
        email
      }
    })

    if (customerExist !== null) {
      const customer: CustomerProps = {
        id: customerExist.id,
        name: customerExist.name,
        lastName: customerExist.lastName,
        email: customerExist.email,
        phone: customerExist.phone,
        phone1: customerExist.phone1,
        birthDate: customerExist.birthDate,
        address: {
          city: customerExist.city,
          neighborhood: customerExist.neighborhood,
          state: customerExist.state,
          street: customerExist.street,
          streetNumber: customerExist.streetNumber,
          zipcode: customerExist.zipcode
        },
        document: {
          docNumber: customerExist.docNumber,
          docType: customerExist.docType
        }
      }

      return customer
    }

    return null
  }

  async create ({ props }: Customer): Promise<CustomerProps> {
    // await prisma.$queryRaw`INSERT INTO "Customer" () VALUES($1, $2), ${props.name} RETURNING "public"."Customer"."id"`

    const data = await prisma.customer.create({
      data: {
        name: props.name,
        lastName: props.lastName,
        email: props.email,
        phone: props.phone,
        phone1: props.phone1,
        birthDate: props.birthDate,
        city: props.address.city,
        neighborhood: props.address.neighborhood,
        state: props.address.state,
        street: props.address.street,
        streetNumber: props.address.streetNumber,
        zipcode: props.address.zipcode,
        docNumber: props.document.docNumber,
        docType: props.document.docType
      }
    })

    const customer: CustomerProps = {
      id: data.id,
      name: data.name,
      lastName: data.lastName,
      email: data.email,
      phone: data.phone,
      phone1: data.phone1,
      birthDate: data.birthDate,
      address: {
        city: data.city,
        neighborhood: data.neighborhood,
        state: data.state,
        street: data.street,
        streetNumber: data.streetNumber,
        zipcode: data.zipcode
      },
      document: {
        docNumber: data.docNumber,
        docType: data.docType
      }
    }

    return customer
  }

  async list (): Promise<CustomerProps[]> {
    const customer = await prisma.customer.findMany()

    const customers = customer.map(data => {
      const newCustomer: CustomerProps = {
        id: data.id,
        name: data.name,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        phone1: data.phone1,
        birthDate: data.birthDate,
        address: {
          city: data.city,
          neighborhood: data.neighborhood,
          state: data.state,
          street: data.street,
          streetNumber: data.streetNumber,
          zipcode: data.zipcode
        },
        document: {
          docNumber: data.docNumber,
          docType: data.docType
        }
      }

      return newCustomer
    })

    return customers
  }
}
