import { prisma } from '../../../../shared/utils/prisma'
import { Customer, CustomerProps } from '../../entities/customer'
import { CustomerRepository } from '../customer-repository'

export class PrismaCustomerRepository implements CustomerRepository {
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
