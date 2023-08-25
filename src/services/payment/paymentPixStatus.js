// const paymentPixUpdateStatus = require('./paymentPixUpdateStatus')

module.exports = class PaymentStatus {
  constructor ({ LoggerService, CognaPayClient, PaymentPixUpdateService, PaymentRepository }) {
    this.LoggerService = LoggerService
    this.CognaPayClient = CognaPayClient
    this.PaymentRepository = PaymentRepository
    this.PaymentPixUpdateService = PaymentPixUpdateService
  }

  get = async (originId) => {
    const step = this.LoggerService.addStep('PaymentServicePixStatus')
    try {
      const paymentData = await this.PaymentRepository.findBy({ originId })

      if (!paymentData) {
        // Se não tiver registro de pagamento na base de dados. não é realizada a busca no cogna pay.
        step.finalize({ originId, paymentData })
        return null
      }

      this.LoggerService.setIndex({
        system: paymentData.system,
        businessKey: paymentData.businessKey,
        originId: paymentData.originId,
        orderReference: paymentData.orderReference
      })

      if (paymentData.paymentStatus === 'PAID') {
        const status = setStatus(paymentData.invoiceType, paymentData.paymentStatus, paymentData.totalAmount, paymentData.paymentDate, paymentData.paymentType)
        step.finalize({ originId, status })
        return status
      }

      const order = await getStatus(paymentData.orderReference, paymentData.system, this.PaymentPixUpdateService, this.CognaPayClient)

      if (!order) {
        step.finalize({ originId, paymentData })
        return null
      }

      const type = getPaymentType(order)
      const status = setStatus(order.invoiceType, order.status.toUpperCase(), order.totalAmount, order.paymentDate, type)
      step.finalize({ originId, status })
      return status
    } catch (error) {
      step.finalize(error)
      throw error
    }
  }
}

async function getStatus (orderReference, system, PaymentPixUpdateService, CognaPayClient) {
  const paymentStatus = await CognaPayClient.getPaymentStatus(orderReference, system)
  if (paymentStatus && paymentStatus.length >= 1) {
    const status = paymentStatus[paymentStatus.length - 1].status.toUpperCase()
    await PaymentPixUpdateService.update(orderReference, status)
    return paymentStatus[paymentStatus.length - 1]
  }

  return null
}

function setStatus (invoiceType, status, totalAmount, paymentDate, type) {
  return {
    invoiceType,
    status,
    totalAmount,
    paymentDate,
    type
  }
}

function getPaymentType (order) {
  let type
  if (order.payments && order.payments.length > 0) {
    type = order.payments[0].type
  }
  return type.toUpperCase()
}
