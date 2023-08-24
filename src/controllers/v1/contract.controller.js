const { contractsList, contractByContractId, contractAccepted } = require('../../services/enrollments')
const { ValidationError } = require('../../utils/errors')

module.exports = class NotificationController {
  constructor ({ LoggerService }) {
    this.LoggerService = LoggerService
  }

  static async getContracts (request, response, next) {
    try {
      if (!request.query || !request.query.idOrigin) {
        throw new ValidationError('Parâmetros inválidos', [{}])
      }
      const data = await contractsList(request.query.idOrigin)
      return response.status(200).json(data)
    } catch (error) {
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

      const data = await contractAccepted(request.params.contractId, ipAddress)
      stepAccepted.finalize({ contratoAceito: data.response })
      next(data)
    } catch (error) {
      stepAccepted.finalize({ errorAccepted: error })
      next(error)
    }
  }
}
