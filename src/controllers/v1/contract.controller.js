const { contractsList, contractByContractId, contractAccepted } = require('../../services/enrollments')
const { ValidationError, ClientServerError } = require('../../utils/errors')

module.exports = class NotificationController {
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

  static async accepted (request, response, next) {
    try {
      if (!request.params.contractId) {
        throw new ValidationError('Parâmetros inválidos', [{}])
      }

      const { ip } = request.body

      const data = await contractAccepted(request.params.contractId, ip)
      return response.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }
}
