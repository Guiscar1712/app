module.exports = class PaymentService {
  constructor ({ LoggerService, PaymentPixService, PaymentPixSaveService, PaymentPixStatusService, PaymentPixUpdateService }) {
    this.LoggerService = LoggerService
    this.PaymentPixService = PaymentPixService
    this.PaymentPixSaveService = PaymentPixSaveService
    this.PaymentPixStatusService = PaymentPixStatusService
    this.PaymentPixUpdateService = PaymentPixUpdateService
  }

  paymentForPix = async (originId, userId) => {
    return await this.PaymentPixService.get(originId, userId)
  }

  paymentStatus = async (originId) => {
    return await this.PaymentPixStatusService.get(originId)
  }

  paymentPixSave = async (userId, originId, businessKey, system, payDto) => {
    return await this.PaymentPixSaveService.save(userId, originId, businessKey, system, payDto)
  }
}
