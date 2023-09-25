const { ValidationError } = require('../../utils/errors')

module.exports = class NotificationController {
  constructor ({ ContractService, ContractListService, ContractDetailService, LoggerService }) {
    this.ContractService = ContractService
    this.ContractListService = ContractListService
    this.ContractDetailService = ContractDetailService
    this.LoggerService = LoggerService
  }

  getContracts = async (request, response, next) => {
    const step = this.LoggerService.addStepStepTrace('ContractControllerContracts')
    try {
      if (!request.query || !request.query.idOrigin) {
        throw new ValidationError('Parâmetros inválidos', [{}])
      }
      const data = await this.ContractListService.contracts(request.query.idOrigin)

      this.LoggerService.finalizeStep(step.value, step.key, {
        contratoAceito: data.response,
      })

      next(data)
    } catch (error) {
      next(error)
    }
  }

  getByContractId = async (request, response, next) => {
    const step = this.LoggerService.addStepStepTrace('ContractControllerContractById')
    try {
      if (!request.params.contractId) {
        throw new ValidationError('Parâmetros inválidos', [{}])
      }
      const data = await this.ContractDetailService.enrollmentDetails(request.params.contractId)

      this.LoggerService.finalizeStep(step.value, step.key, {
        ContractDetails: data,
      })
      next(data)
    } catch (error) {
      next(error)
    }
  }

  accepted = async (request, response, next) => {
    const step = this.LoggerService.addStepStepTrace('ContractControllerAccepted')

    try {
      if (!request.params.contractId) {
        throw new ValidationError('Parâmetros inválidos', [{}])
      }

      const { ipAddress } = request.body

      const data = await this.ContractService.contractAccepted(request.params.contractId, ipAddress)
      this.LoggerService.finalizeStep(step.value, step.key, {
        contratoAceito: data.response,
      })
      next(data)
    } catch (error) {
      next(error)
    }
  }
}
