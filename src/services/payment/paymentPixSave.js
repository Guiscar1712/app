module.exports = class PaymentPixSave {
  constructor({ LoggerService, PaymentRepository }) {
    this.LoggerService = LoggerService
    this.PaymentRepository = PaymentRepository
  }

  save = async (userId, originId, businessKey, system, payDto) => {
    const step = this.LoggerService.addStep('PaymentServicePixSave')
    try {
      let paymentData = await this.PaymentRepository.findBy({
        orderReference: payDto.orderReference,
      })
      if (!paymentData) {
        paymentData = {
          userId,
          document: payDto.student.cpf,
          studentReference: payDto.student.ra,
          originId,
          system,
          businessKey,
          orderReference: payDto.orderReference,
          invoiceType: payDto.invoiceType,
          paymentType: 'PIX',
          paymentStatus: 'GENERATED',
          totalAmount: payDto.totalAmount,
        }

        const data = await this.PaymentRepository.insert(paymentData)
        step.value.addData({
          userId,
          originId,
          businessKey,
          system,
          payDto,
          data,
        })
        return data
      }
      step.value.addData({
        userId,
        originId,
        businessKey,
        system,
        payDto,
      })
      this.LoggerService.finalizeStep(step)
      return paymentData
    } catch (error) {
      throw error
    }
  }
}
