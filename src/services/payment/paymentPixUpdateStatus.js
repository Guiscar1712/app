const moment = require('moment')
const paymentRepository = require('../../repositories/PaymentRepository')

async function paymentPixSave (orderReference, paymentStatus) {
  const paymentData = await paymentRepository.findBy({ orderReference })
  if (paymentData) {
    const updatedAt = moment().format('YYYY-MM-DD HH:mm:ss.SSS')
    const updateData = {
      paymentStatus: paymentStatus.toUpperCase(),
      updatedAt
    }

    await paymentRepository.update(paymentData.id, updateData)
  }
}

module.exports = paymentPixSave
