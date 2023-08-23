const { ValidationError, NotFoundError } = require('../../utils/errors')
const { paymentForPix, paymentStatus } = require('../../services/payment')
const { ApplyValidate } = require('../../validators/payment')

module.exports = class PaymentController {
  constructor ({ LoggerService }) {
    this.LoggerService = LoggerService
  }

  paymentPix = async (request, response, next) => {
    const step = this.LoggerService.addStep('PaymentControllerPaymentPix')
    try {
      const originId = request.params.originId
      const contract = ApplyValidate(originId)
      if (!contract.isValid()) {
        throw new ValidationError('Parâmetros inválidos', contract.errors())
      }

      const data = await paymentForPix(originId, request.user.id)

      step.finalize(data)
      next(data)
    } catch (error) {
      step.finalize(error)
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

      const data = await paymentStatus(originId)

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
