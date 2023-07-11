const moment = require('moment')

async function paymentStatus (originId, userId) {
  try {
    return getMok()
  } catch (error) {
    throw new Error(error)
  }
}

function getMok () {
  return {
    invoiceType: 'MATRICULA',
    status: 'PAID',
    totalAmount: 140.0,
    paymentDate: moment(),
    type: 'PIX'
  }
}

module.exports = paymentStatus
