const Validator = require('../validator')
const Util = require('../../utils/util')

module.exports = {
  ApplyValidate(model) {
    const contract = new Validator()

    contract.isRequired(
      Util.getNumbers(model.cpf),
      '40001',
      'CPF é Obrigatório'
    )
    contract.isFixedLen(Util.getNumbers(model.cpf), 11, '40002', 'CPF inválido')
    contract.isRequired(model.name, '40003', 'Nome é Obrigatório')
    contract.isEmail(model.email, '40004', 'E-mail inválido')

    return contract
  },

  CpfValidate(model) {
    const contract = new Validator()

    contract.isRequired(
      Util.getNumbers(model.cpf),
      '40001',
      'CPF é Obrigatório'
    )
    contract.isFixedLen(Util.getNumbers(model.cpf), 11, '40002', 'CPF inválido')

    return contract
  },

  UpdatePersonalDataValidate(model) {
    const contract = new Validator()

    contract.isTrue(
      Util.isValidCpf(model.documentCpf),
      '40001',
      'CPF é inválido'
    )
    contract.isRequired(model.name, '40003', 'Nome é Obrigatório')
    contract.hasMinLen(model.name, 7, '40003', 'Nome deve ser completo')
    contract.isRequired(model.documentRg, '40003', 'Rg é Obrigatório')
    contract.isDateValid(
      model.birthdate,
      '40003',
      'Data de nascimento inválida'
    )

    contract.isRequired(model.emails, '40003', 'Email é Obrigatório')
    if (model.emails && model.emails.length > 0) {
      model.emails.forEach((element) => {
        contract.isEmail(element.email, '40003', 'Email é inválido')
      })
    }

    contract.isRequired(model.telephones, '40003', 'Telefone é Obrigatório')
    if (model.telephones && model.telephones.length > 0) {
      const telephonesType = ['MOVEL', 'FIXO']
      model.telephones.forEach((element) => {
        contract.isRequired(
          element.number,
          '40003',
          'Numero de telefone é Obrigatório'
        )
        contract.containsInArray(
          element.type,
          telephonesType,
          '40003',
          'Numero de telefone é Obrigatório'
        )
      })
    }

    contract.isRequired(model.addresses, '40003', 'Endereço é obrigatório')
    if (model.addresses && model.addresses.length > 0) {
      const addressesType = ['PRINCIPAL', 'COBRANCA', 'RESPONSAVEL']
      const uf = [
        'AC',
        'AL',
        'AP',
        'AM',
        'BA',
        'CE',
        'DF',
        'ES',
        'GO',
        'MA',
        'MT',
        'MS',
        'MG',
        'PA',
        'PB',
        'PR',
        'PE',
        'PI',
        'RJ',
        'RN',
        'RS',
        'RO',
        'RR',
        'SC',
        'SP',
        'SE',
        'TO',
      ]
      model.addresses.forEach((element) => {
        contract.containsInArray(
          element.type,
          addressesType,
          '40003',
          'Tipo de endereço é inválido'
        )
        contract.isRequired(element.street, '40003', 'Logradouro é Obrigatório')
        contract.isRequired(element.city, '40003', 'Municipio é Obrigatório')
        contract.containsInArray(
          element.stateAcronym,
          uf,
          '40003',
          'Uf é invalido'
        )

        const cep = Util.getNumbers(element.zipCode)
        contract.isFixedLen(cep, 8, '40003', 'CEP é inválido')
      })
    }

    return contract
  },

  LoginValidate(model) {
    const contract = new Validator()

    contract.isRequired(model.password, '40001', 'Senha é Obrigatório')
    contract.isEmail(model.email, '40004', 'E-mail inválido')

    return contract
  },

  DuplicateRegister(model) {
    const contract = new Validator()
    contract.duplicateRegister(model.cpf, '40005', 'CPF já cadastrado!')
    contract.duplicateRegister(model.email, '40006', 'E-mail já cadastrado!')
    contract.duplicateRegister(model.phone, '40007', 'Telefone já cadastrado!')

    return contract
  },
}
