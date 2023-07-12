const moment = require('moment')
const paymentPixUpdateStatus = require('./paymentPixUpdateStatus')
const paymentRepository = require('../../repositories/PaymentRepository')
const { getPaymentStatus } = require('../../clients/cognapay')
// const { NotFoundError } = require('../../utils/errors')

async function paymentStatus (originId, userId) {
  try {
    const paymentData = await paymentRepository.findBy({ originId })
    if (paymentData && paymentData.paymentStatus === 'PAID') {
      return setStatus(paymentData.invoiceType, paymentData.paymentStatus, paymentData.totalAmount, paymentData.paymentDate, paymentData.paymentType)
    }

    if (paymentData && paymentData.paymentStatus !== 'PAID') {
      const orders = await getStatus(paymentData.orderReference, paymentData.system)

      if (!orders || orders.length <= 0) {
        return null
      }

      const order = orders[0]
      const type = getPaymentType(order)
      return setStatus(order.invoiceType, order.status.toUpperCase(), order.totalAmount, order.paymentDate, type)
    }

    return null
    // return getMok()
  } catch (error) {

  }
}

async function getStatus (orderReference, system) {
  const paymentStatus = await getPaymentStatus(orderReference, system)
  if (paymentStatus && paymentStatus.length >= 1) {
    const status = paymentStatus[0].status.toUpperCase()
    await paymentPixUpdateStatus(orderReference, status)
    return paymentStatus
  }
}

function setStatus (invoiceType, status, totalAmount, paymentDate, type) {
  return {
    invoiceType,
    status,
    totalAmount,
    paymentDate,
    type
  }
}

function getPaymentType (order) {
  let type
  if (order.payments && order.payments.length > 0) {
    type = order.payments[0].type
  }
  return type.toUpperCase()
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
