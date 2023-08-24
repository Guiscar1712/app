const { asClass } = require('awilix')

const ContractController = require('../../../controllers/v1/contract.controller')

module.exports = {

  ContractController: asClass(ContractController).scoped()
}
