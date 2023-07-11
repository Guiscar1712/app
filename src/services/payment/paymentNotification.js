const moment = require('moment')
const paymentRepository = require('../../repositories/PaymentRepository')
const RegisterAppRepository = require('./../../repositories/RegisterAppRepository')
const NotificationFirebase = require('./../notificationFirebase.service')

async function paymentNotification (payment) {
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

module.exports = paymentNotification
