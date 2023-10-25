const moment = require('moment')
module.exports = class PaymentPixUpdate {
  constructor({ LoggerService, PaymentRepository }) {
    this.LoggerService = LoggerService
    this.PaymentRepository = PaymentRepository
  }

  update = async (orderReference, paymentStatus) => {
    const step = this.LoggerService.addStep('PaymentServicePixUpdate')
    try {
      const paymentData = await this.PaymentRepository.findBy({
        orderReference,
      })
      if (paymentData) {
        const updatedAt = moment().format('YYYY-MM-DD HH:mm:ss.SSS')
        const updateData = {
          paymentStatus: paymentStatus.toUpperCase(),
          updatedAt,
        }

        const data = await this.PaymentRepository.update(
          paymentData.id,
          updateData
        )
        step.value.addData({ orderReference, paymentStatus, paymentData, data })
        return data
      }
      step.value.addData({ orderReference, paymentStatus, paymentData })
      return null
    } catch (error) {
      step.value.addData(error)
      throw error
    } finally {
      this.LoggerService.finalizeStep(step)
    }
  }
}
