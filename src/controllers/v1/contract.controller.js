const { ValidationError } = require('../../utils/errors')
const Util = require('../../utils/util')

module.exports = class NotificationController {
  constructor({
    ContractService,
    ContractListService,
    ContractDetailService,
    LoggerService,
  }) {
    this.ContractService = ContractService
    this.ContractListService = ContractListService
    this.ContractDetailService = ContractDetailService
    this.LoggerService = LoggerService
  }

  getContracts = async (request, response, next) => {
    const step = this.LoggerService.addStep('ContractControllerContracts')
    try {
      if (!request.query || !request.query.idOrigin) {
        throw new ValidationError('Parâmetros inválidos', [{}])
      }
      const data = await this.ContractListService.contracts(
        request.query.idOrigin
      )

      step.value.addData({ contratoAceito: data.response })
      this.LoggerService.finalizeStep(step)

      next(data)
    } catch (error) {
      next(error)
    }
  }

  getByContractId = async (request, response, next) => {
    const step = this.LoggerService.addStep('ContractControllerContractById')
    try {
      if (!request.params.contractId) {
        throw new ValidationError('Parâmetros inválidos', [{}])
      }
      const data = await this.ContractDetailService.enrollmentDetails(
        request.params.contractId
      )

      step.value.addData({ ContractDetails: data })
      this.LoggerService.finalizeStep(step)

      next(data)
    } catch (error) {
      next(error)
    }
  }

  accepted = async (request, response, next) => {
    const step = this.LoggerService.addStep('ContractControllerAccepted')

    try {
      if (!request.params.contractId) {
        throw new ValidationError('Parâmetros inválidos', [{}])
      }

      let ipAddress =
        request.headers['x-forwarded-for'] ||
        request.socket.remoteAddress ||
        '0.0.0.0'

      ipAddress = Util.splitIP(ipAddress)

      const data = await this.ContractService.contractAccepted(
        request.params.contractId,
        ipAddress
      )

      step.value.addData({ contratoAceito: data.response })
      this.LoggerService.finalizeStep(step)

      next(data)
    } catch (error) {
      next(error)
    }
  }
}
