import { cnpj, cpf } from 'cpf-cnpj-validator'

export function validationCnpjCpf (type: 'cnpj' | 'cpf', docNumber: string): boolean | undefined {
  if (type === 'cpf') {
    return cpf.isValid(docNumber)
  }
  if (type === 'cnpj') {
    return cnpj.isValid(docNumber)
  }
}
