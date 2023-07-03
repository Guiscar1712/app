const Validator = require('../validator')

module.exports = {
  ApplyValidate (cpf) {
    const contract = new Validator()

    contract.isRequired(cpf, '40103', 'cpf é obrigatório')
    contract.cpf(cpf, '40103', 'CPF inválido!')

    return contract
  }
}
