const { ValidationError } = require('../../utils/errors')

module.exports = class NotificationController {
  constructor ({ ContractService, ContractListService, ContractDetailService, LoggerService }) {
    this.ContractService = ContractService
    this.ContractListService = ContractListService
    this.ContractDetailService = ContractDetailService
    this.LoggerService = LoggerService
  }

  getContracts = async (request, response, next) => {
    const stepGetContracts = this.LoggerService.addStep('GetContracts')
    try {
      if (!request.query || !request.query.idOrigin) {
        stepGetContracts.finalize({ errorGetContracts: `Parâmetros inválidos -> request.query: ${request.query}  ---  request.query.idOrigin: ${request.query.idOrigin}` })
        throw new ValidationError('Parâmetros inválidos', [{}])
      }
      const data = await this.ContractListService.contracts(request.query.idOrigin)

      stepGetContracts.finalize({ getContracts: data.length })

      next(data)
    } catch (error) {
      stepGetContracts.finalize({ errorGetContracts: error })
      next(error)
    }
  }

  getByContractId = async (request, response, next) => {
    const stepContractDetails = this.LoggerService.addStep('ContractDetails')
    try {
      if (!request.params.contractId) {
        stepContractDetails.finalize({ ParamsError: 'Parâmetros inválidos' })
        throw new ValidationError('Parâmetros inválidos', [{}])
      }
      const data = await this.ContractDetailService.enrollmentDetails(request.params.contractId)
      stepContractDetails.finalize({ ContractDetails: data })
      next(data)
    } catch (error) {
      next(error)
    }
  }

  accepted = async (request, response, next) => {
    const stepAccepted = this.LoggerService.addStep('Accepted')

    try {
      if (!request.params.contractId) {
        throw new ValidationError('Parâmetros inválidos', [{}])
      }

      const { ipAddress } = request.body

      const data = await this.ContractService.contractAccepted(request.params.contractId, ipAddress)
      stepAccepted.finalize({ contratoAceito: data.response })
      next(data)
    } catch (error) {
      stepAccepted.finalize({ errorAccepted: error })
      next(error)
    }
  }
}
