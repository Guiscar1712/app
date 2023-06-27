const moment = require('moment')
const { ingressoClient, cognaPay } = require('../clients')
const { getSubscriptionPayDto } = require('../dto/subscription')
const paymentRepository = require('../repositories/PaymentRepository')
const RegisterAppRepository = require('./../repositories/RegisterAppRepository')
const NotificationFirebase = require('./notificationFirebase.service')
module.exports = class PaymentService {
  static async pix (originId, userId) {
    try {
      const subscription = await ingressoClient.inscricao.get(originId)

      const payDto = getSubscriptionPayDto(subscription)

      const data = await cognaPay.pix.get(payDto)

      if (!data.error) {
        await PaymentService.save(payDto, userId, subscription)
      }

      return data
    } catch (error) {
      throw new Error(error)
    }
  }

  static async save (payDto, userId, subscription) {
    let paymentData = await paymentRepository.findBy({ orderReference: payDto.OrderReference })
    if (!paymentData) {
      paymentData = {
        userId,
        paymentId: payDto.PaymentId,
        subscriptionKey: subscription.inscricao.businessKey,
        totalAmount: payDto.TotalAmount,
        origin: payDto.Origin,
        itemReference: payDto.Charges[0].ChargeReference,
        orderReference: payDto.OrderReference,
        studentReference: payDto.Student.RA,
        document: payDto.Student.CPF,
        typeOfPayment: 'PIX',
        paymentStatus: 'Generated'
      }

      await paymentRepository.insert(paymentData)
    }
  }

  static async notification (payment) {
    const paymentData = await paymentRepository.findBy({ orderReference: payment.OrderReference })

    if (!paymentData) {
      return
    }

    const updatedAt = moment().format('YYYY-MM-DD HH:mm:ss.SSS')

    const data = await paymentRepository.update(paymentData.id, { paymentId: payment.PaymentId, paymentStatus: payment.Status, updatedAt })

    console.log(data)

    const deviceRegisters = await RegisterAppRepository.filterBy({ UserId: paymentData.userId })

    if (deviceRegisters.length > 0) {
      const tokens = deviceRegisters.map(m => m.token)
      await NotificationFirebase.sendFromClient(tokens, 'Confirmação de pagamento', paymentData)
    }
  }
}
