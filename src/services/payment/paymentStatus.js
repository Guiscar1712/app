const moment = require('moment')
const paymentPixUpdateStatus = require('./paymentPixUpdateStatus')
const paymentRepository = require('../../repositories/PaymentRepository')
const { getPaymentStatus } = require('../../clients/cognapay')

async function paymentStatus (originId) {
  const paymentData = await paymentRepository.findBy({ originId })
  if (paymentData && paymentData.paymentStatus === 'PAID') {
    return setStatus(paymentData.invoiceType, paymentData.paymentStatus, paymentData.totalAmount, paymentData.paymentDate, paymentData.paymentType)
  }

  // mock
  // paymentData = {}
  // paymentData.paymentStatus = 'GENERATED'
  // paymentData.orderReference = 'U-1184IFCXLK8B9P1EK4YZA'
  // paymentData.system = 'ATHENAS'

  if (paymentData && paymentData.paymentStatus !== 'PAID') {
    const order = await getStatus(paymentData.orderReference, paymentData.system)

    if (!order) {
      return null
    }

    const type = getPaymentType(order)
    return setStatus(order.invoiceType, order.status.toUpperCase(), order.totalAmount, order.paymentDate, type)
  }

  return null
  // return getMok()
}

async function getStatus (orderReference, system) {
  const paymentStatus = await getPaymentStatus(orderReference, system)
  if (paymentStatus && paymentStatus.length >= 1) {
    const status = paymentStatus[paymentStatus.length - 1].status.toUpperCase()
    await paymentPixUpdateStatus(orderReference, status)
    return paymentStatus[paymentStatus.length - 1]
  }

  return null
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
