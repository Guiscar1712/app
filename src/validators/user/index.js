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
