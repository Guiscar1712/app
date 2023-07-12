const { ValidationError, NotFoundError } = require('../../utils/errors')
const { paymentForPix, paymentStatus } = require('../../services/payment')
const { ApplyValidate } = require('../../validators/payment')

module.exports = class PaymentController {
  static async paymentPix (request, response, next) {
    try {
      const originId = request.params.originId
      const contract = ApplyValidate(originId)
      if (!contract.isValid()) {
        throw new ValidationError('Parâmetros inválidos', contract.errors())
      }

      const data = await paymentForPix(originId, request.user.id)

      if (data.error) {
        return response.status(400).json(data)
      }

      return response.status(201).json(data)
    } catch (error) {
      next(error)
    }
  }

  static async paymentStatus (request, response, next) {
    try {
      const originId = request.params.originId
      const contract = ApplyValidate(originId)
      if (!contract.isValid()) {
        throw new ValidationError('Parâmetros inválidos', contract.errors())
      }

      const data = await paymentStatus(originId, request.user.id)

      if (!data) {
        throw new NotFoundError('Registro não encontrato', [{ originId }])
      }

      if (data.error) {
        return response.status(400).json(data)
      }

      return response.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }
}
