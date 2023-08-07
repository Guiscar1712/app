const paymentRepository = require('../../repositories/PaymentRepository')

async function paymentPixSave (userId, originId, businessKey, system, payDto) {
  let paymentData = await paymentRepository.findBy({ orderReference: payDto.orderReference })
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
      totalAmount: payDto.totalAmount
    }

    await paymentRepository.insert(paymentData)
  }
}

module.exports = paymentPixSave
