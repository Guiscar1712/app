const { asClass } = require('awilix')

const ContractController = require('../../../controllers/v1/contract.controller')
const ContractAcceptedService = require('../../../services/enrollments/contractAccepted')

module.exports = {
  ContractController: asClass(ContractController).scoped(),
  ContractService: asClass(ContractAcceptedService).scoped()
}
