const Validator = require('../validator')

module.exports = {
  ApplyValidate (value) {
    const contract = new Validator()

    contract.isRequired(value, '40103', 'originId é obrigatório')

    return contract
  }
}
