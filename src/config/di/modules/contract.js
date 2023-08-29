const { asClass } = require('awilix')

const ContractController = require('../../../controllers/v1/contract.controller')
const ContractAcceptedService = require('../../../services/enrollments/contractAccepted')
const ContractListService = require('../../../services/enrollments/contractsList')
const ContractDetailService = require('../../../services/enrollments/contractByContractId')

module.exports = {
  ContractController: asClass(ContractController).scoped(),
  ContractService: asClass(ContractAcceptedService).scoped(),
  ContractListService: asClass(ContractListService).scoped(),
  ContractDetailService: asClass(ContractDetailService).scoped()
}
