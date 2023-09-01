const { ValidationError, NotFoundError } = require('../../utils/errors')
const { ApplyValidate } = require('../../validators/payment')
module.exports = class PaymentController {
  constructor ({ PaymentService, LoggerService }) {
    this.LoggerService = LoggerService
    this.PaymentService = PaymentService
  }

  paymentPix = async (request, response, next) => {
    const step = this.LoggerService.addStep('PaymentControllerPaymentPix')
    try {
      const originId = request.params.originId
      const contract = ApplyValidate(originId)
      if (!contract.isValid()) {
        throw new ValidationError('Parâmetros inválidos', contract.errors())
      }

      const data = await this.PaymentService.paymentForPix(originId, request.user.id)
      step.finalize(data)
      next(data)
    } catch (error) {
      step.finalize()
      next(error)
    }
  }

  paymentStatus = async (request, response, next) => {
    const step = this.LoggerService.addStep('PaymentControllerPaymentPix')
    try {
      const originId = request.params.originId
      const contract = ApplyValidate(originId)
      if (!contract.isValid()) {
        throw new ValidationError('Parâmetros inválidos', contract.errors())
      }

      const data = await this.PaymentService.paymentStatus(originId)

      if (!data) {
        throw new NotFoundError('Registro não encontrato', [{ originId }])
      }

      step.finalize(data)
      next(data)
    } catch (error) {
      step.finalize()
      next(error)
    }
  }
}
