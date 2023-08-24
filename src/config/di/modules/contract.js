const { asClass } = require('awilix')

const ContractController = require('../../../controllers/v1/contract.controller')
const ContractService = require('../../../services/enrollments/contractAccepted.js')

module.exports = {
  ContractController: asClass(ContractController).scoped(),
  ContractService: asClass(ContractService).scoped()
}
