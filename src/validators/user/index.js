const Validator = require('../validator')
const Util = require('../../utils/util')

module.exports = {
  ApplyValidate (model) {
    const contract = new Validator()

    contract.isRequired(Util.getNumbers(model.cpf), '40001', 'CPF é Obrigatório')
    contract.isFixedLen(Util.getNumbers(model.cpf), 11, '40002', 'CPF inválido')
    contract.isRequired(model.name, '40003', 'Nome é Obrigatório')
    contract.isEmail(model.email, '40004', 'E-mail inválido')

    return contract
  },

  CpfValidate (model) {
    const contract = new Validator()

    contract.isRequired(Util.getNumbers(model.cpf), '40001', 'CPF é Obrigatório')
    contract.isFixedLen(Util.getNumbers(model.cpf), 11, '40002', 'CPF inválido')

    return contract
  },

  UpdatePersonalDataValidate (model) {
    const contract = new Validator()

    contract.isTrue(Util.isValidCpf(model.cpf), '40001', 'CPF é inválido')
    contract.isRequired(model.nome, '40003', 'Nome é Obrigatório')
    contract.hasMinLen(model.nome, 7, '40003', 'Nome deve ser completo')
    contract.isRequired(model.rg, '40003', 'Rg é Obrigatório')
    contract.isDateValid(model.dataNascimento, '40003', 'Data de nascimento inválida')

    contract.isRequired(model.emails, '40003', 'Email é Obrigatório')
    if (model.emails && model.emails.length > 0) {
      model.emails.forEach(element => {
        contract.isEmail(element.email, '40003', 'Email é inválido')
      })
    }

    contract.isRequired(model.telefones, '40003', 'Telefone é Obrigatório')
    if (model.telefones && model.telefones.length > 0) {
      const tipo = ['MOVEL', 'FIXO']
      model.telefones.forEach(element => {
        contract.isRequired(element.numero, '40003', 'Numero de telefone é Obrigatório')
        contract.containsInArray(element.tipo, tipo, '40003', 'Numero de telefone é Obrigatório')
      })
    }

    contract.isRequired(model.enderecos, '40003', 'Endereço é obrigatório')
    if (model.enderecos && model.enderecos.length > 0) {
      const tipo = ['PRINCIPAL', 'COBRANCA', 'RESPONSAVEL']
      const uf = ['AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA', 'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN', 'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO']
      model.enderecos.forEach(element => {
        contract.containsInArray(element.tipo, tipo, '40003', 'Tipo de endereço é inválido')
        contract.isRequired(element.logradouro, '40003', 'Logradouro é Obrigatório')
        contract.isRequired(element.municipio, '40003', 'Municipio é Obrigatório')
        contract.containsInArray(element.uf, uf, '40003', 'Uf é invalido')

        const cep = Util.getNumbers(element.cep)
        contract.isFixedLen(cep, 8, '40003', 'CEP é inválido')
      })
    }

    return contract
  },

  LoginValidate (model) {
    const contract = new Validator()

    contract.isRequired(model.password, '40001', 'Senha é Obrigatório')
    contract.isEmail(model.email, '40004', 'E-mail inválido')

    return contract
  },

  DuplicateRegister (model) {
    const contract = new Validator()
    contract.duplicateRegister(model.cpf, '40005', 'CPF já cadastrado!')
    contract.duplicateRegister(model.email, '40006', 'E-mail já cadastrado!')
    contract.duplicateRegister(model.phone, '40007', 'Telefone já cadastrado!')

    return contract
  }
}
