const Validator = require('../validator')

module.exports = {
  CpfValidate (cpf) {
    const contract = new Validator()

    contract.isRequired(cpf, '40103', 'cpf é obrigatório')
    contract.cpf(cpf, '40103', 'CPF inválido!')

    return contract
  },

  IdOriginValidate (idOrigin) {
    const contract = new Validator()

    contract.isRequired(idOrigin, '40103', 'idOrigin é obrigatório')

    return contract
  }
}
