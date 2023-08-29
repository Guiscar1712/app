const { contractByContractId } = require('../../services/enrollments')
const { ValidationError } = require('../../utils/errors')

module.exports = class NotificationController {
  constructor ({ ContractService, ContractListService, LoggerService }) {
    this.ContractService = ContractService
    this.ContractListService = ContractListService
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

      return response.status(200).json(data)
    } catch (error) {
      stepGetContracts.finalize({ errorGetContracts: error })
      next(error)
    }
  }

  static async getByContractId (request, response, next) {
    try {
      if (!request.params.contractId) {
        throw new ValidationError('Parâmetros inválidos', [{}])
      }
      const data = await contractByContractId(request.params.contractId)
      return response.status(200).json(data)
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
