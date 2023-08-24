const PaymentForPix = require('./paymentForPix')
const paymentStatus = require('./paymentStatus')
const paymentNotification = require('./paymentNotification')
const paymentPixSave = require('./paymentPixSave')

module.exports = class PaymentService {
  constructor ({ LoggerService }) {
    this.LoggerService = LoggerService
  }

  paymentForPix = async (originId, userId) => {
    return await PaymentForPix(originId, userId, this.LoggerService)
  }

  paymentStatus = async (originId) => {
    return await paymentStatus(originId)
  }

  paymentNotification = async (payment) => {
    return await paymentNotification(payment)
  }

  paymentPixSave = async (userId, originId, businessKey, system, payDto) => {
    return await paymentPixSave(userId, originId, businessKey, system, payDto)
  }
}
