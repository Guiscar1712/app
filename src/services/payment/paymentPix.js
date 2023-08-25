const { ingressoClient } = require('../../clients')
const PaymentPixResponse = require('../../dto/payment/PaymentPixResponse.Dto')
const PaymentPixRequest = require('../../dto/payment/PaymentPixRequest.Dto')
const retry = require('../../utils/retry')
const { ClientServerError } = require('../../utils/errors')

module.exports = class PaymentForPix {
  constructor ({ LoggerService, PaymentPixSaveService, PaymentPixStatusService, CognaPayClient, IngressoClient }) {
    this.LoggerService = LoggerService
    this.PaymentPixSaveService = PaymentPixSaveService
    this.PaymentPixStatusService = PaymentPixStatusService
    this.CognaPayClient = CognaPayClient
    this.IngressoClient = IngressoClient
  }

  get = async (originId, userId) => {
    const step = this.LoggerService.addStep('PaymentServicePaymentPix')
    try {
      const status = await this.PaymentPixStatusService.get(originId)
      if (status?.status === 'PAID') {
        step.finalize(status)
        return null
      }

      const enrollment = await retry(ingressoClient.inscricaoPorIdOrigin, originId)
      const system = enrollment.sistema.toUpperCase()
      const businessKey = enrollment.inscricao.businessKey
      if (!businessKey) {
        this.LoggerService.setIndex({ system, businessKey, originId })
        step.finalize(enrollment)
        return null
      }

      this.LoggerService.setIndex({ system, businessKey, originId })
      const order = await retry(this.IngressoClient.getDadosPagamento, businessKey)
      const payDto = new PaymentPixRequest(order)

      if (!payDto.isValid()) {
        const errors = payDto.errors()
        this.LoggerService.setIndex({ system, businessKey, originId, orderReference: order.orderReference })
        throw new ClientServerError('Invalid object - Check OrderReference request.', JSON.stringify(errors))
      }

      const data = await retry(this.CognaPayClient.payForPix, { body: payDto, system })

      if (!data.error) {
        await this.PaymentPixSaveService.save(userId, originId, businessKey, system, payDto)
        const res = new PaymentPixResponse(data.qrCode, data.qrCodeUrl, payDto.preDefinedOptions.pix.expireAtDateTime, payDto.totalAmount)
        this.LoggerService.setIndex({ system, businessKey, originId, orderReference: order.orderReference })
        step.finalize(res)
        return res
      }
    } catch (error) {
      step.finalize(error)
      throw error
    }
  }
}
