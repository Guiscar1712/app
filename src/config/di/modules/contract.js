const { asClass } = require('awilix')

const ContractController = require('../../../controllers/v1/contract.controller')
const ContractAcceptedService = require('../../../services/enrollments/contractAccepted')
const ContractListService = require('../../../services/enrollments/contractsList')
const ContractDetailService = require('../../../services/enrollments/contractByContractId')

module.exports = {
  ContractController: asClass(ContractController),
  ContractService: asClass(ContractAcceptedService),
  ContractListService: asClass(ContractListService),
  ContractDetailService: asClass(ContractDetailService),
}
