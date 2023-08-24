const { ingressoClient, cognaPay } = require('../../clients')
const paymentPixSave = require('./paymentPixSave')
const PaymentPixResponse = require('../../dto/payment/PaymentPixResponse.Dto')
const PaymentPixRequest = require('../../dto/payment/PaymentPixRequest.Dto')
const paymentStatus = require('./paymentStatus')
const retry = require('../../utils/retry')
const { ClientServerError } = require('../../utils/errors')

async function paymentForPix (originId, userId, LoggerService) {
  const step = LoggerService.addStep('PaymentServicePaymentForPix')
  try {
    const status = await paymentStatus(originId)
    if (status?.status === 'PAID') {
      step.finalize(status)
      return null
    }

    const enrollment = await retry(ingressoClient.inscricaoPorIdOrigin, originId)
    const businessKey = enrollment.inscricao.businessKey
    if (!businessKey) {
      step.finalize(enrollment)
      return null
    }

    const order = await retry(ingressoClient.consultaDadosPagamento, businessKey)
    const payDto = new PaymentPixRequest(order)

    if (!payDto.isValid()) {
      const errors = payDto.errors()
      throw new ClientServerError('Invalid object - Check OrderReference request.', JSON.stringify(errors))
    }

    const system = enrollment.sistema.toUpperCase()

    const data = await retry(cognaPay.payForPix, { body: payDto, system })

    if (!data.error) {
      await paymentPixSave(userId, originId, businessKey, system, payDto)
      const res = new PaymentPixResponse(data.qrCode, data.qrCodeUrl, payDto.preDefinedOptions.pix.expireAtDateTime, payDto.totalAmount)
      step.finalize(res)
      return res
    }
  } catch (error) {
    step.finalize(error)
    throw error
  }
}

module.exports = paymentForPix
