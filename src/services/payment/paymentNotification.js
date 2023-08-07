const moment = require('moment')
const paymentRepository = require('../../repositories/PaymentRepository')
const RegisterAppRepository = require('./../../repositories/RegisterAppRepository')
const NotificationFirebase = require('./../notificationFirebase.service')
const logger = require('../../utils/logger.util')
const PaymentNotification = require('../../dto/payment/PaymentNotification')
const { toCamelCaseKeys } = require('../../extensions')

async function paymentNotification (payment) {
  const paymentData = await paymentRepository.findBy({ orderReference: payment.OrderReference })
  if (!paymentData) {
    logger.info(`Process message - OrderReference not found in database: ${payment.OrderReference}`)
    return
  }

  const updatedAt = moment().format('YYYY-MM-DD HH:mm:ss.SSS')
  const statusPayment = payment.Status.toUpperCase()

  await paymentRepository.update(paymentData.id, { paymentStatus: statusPayment, updatedAt })
  logger.info(`Process message - Update OrderReference: ${payment.OrderReference}`)

  if (statusPayment !== 'PAID') {
    logger.info(`Process message - OrderReference: ${payment.OrderReference} - Status: ${statusPayment} - does not send notification`)
    return
  }

  const deviceRegisters = await RegisterAppRepository.filterBy({ UserId: paymentData.userId })

  if (deviceRegisters.length > 0) {
    const tokens = deviceRegisters.map(m => m.token)
    const data = toCamelCaseKeys({ ...paymentData, ...payment, statusPayment })
    const message = new PaymentNotification(data)

    await NotificationFirebase.sendFromClient(tokens, message)
    logger.info(`Process message - OrderReference: ${payment.OrderReference} - Notification sent!`)
    return
  }

  logger.info(`Process message - OrderReference: ${payment.OrderReference} - RegisterApp not found in database`)
}

module.exports = paymentNotification
