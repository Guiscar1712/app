const moment = require('moment')
const paymentRepository = require('../../repositories/PaymentRepository')
const RegisterAppRepository = require('./../../repositories/RegisterAppRepository')
const NotificationFirebase = require('./../notificationFirebase.service')
const logger = require('../../utils/logger.util')

async function paymentNotification (payment) {
  const paymentData = await paymentRepository.findBy({ orderReference: payment.OrderReference })
  if (!paymentData) {
    logger.info(`Process message - OrderReference not found in database: ${payment.OrderReference}`)
    return
  }

  const updatedAt = moment().format('YYYY-MM-DD HH:mm:ss.SSS')
  const paymentStatus = payment.Status.toUpperCase()

  await paymentRepository.update(paymentData.id, { paymentStatus, updatedAt })
  logger.info(`Process message - Update OrderReference: ${payment.OrderReference}`)

  if (paymentStatus !== 'PAID') {
    logger.info(`Process message - OrderReference: ${payment.OrderReference} - Status: ${paymentStatus} - does not send notification`)
    return
  }

  const deviceRegisters = await RegisterAppRepository.filterBy({ UserId: paymentData.userId })

  if (deviceRegisters.length > 0) {
    const tokens = deviceRegisters.map(m => m.token)
    const message = {
      title: `Notificação de Pagamento de ${paymentData.invoiceType}`,
      body: `Confirmação de pagamento via ${paymentData.paymentType}`,
      data: {
        invoiceType: paymentData.invoiceType,
        notificationType: 'PAYMENT',
        paymentType: paymentData.paymentType,
        statusPayment: paymentStatus,
        idOrigin: paymentData.originId,
        totalAmount: payment.TotalAmount,
        paymentDate: payment.PaymentDate
      }
    }

    await NotificationFirebase.sendFromClient(tokens, message)
    logger.info(`Process message - OrderReference: ${payment.OrderReference} - Notification sent!`)
    return
  }

  logger.info(`Process message - OrderReference: ${payment.OrderReference} - RegisterApp not found in database`)
}

module.exports = paymentNotification
