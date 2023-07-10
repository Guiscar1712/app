const moment = require('moment')
const { ingressoClient, cognaPay } = require('../../clients')
const { getSubscriptionPayDto } = require('../../dto/subscription')
const paymentRepository = require('../../repositories/PaymentRepository')
const RegisterAppRepository = require('./../../repositories/RegisterAppRepository')
const NotificationFirebase = require('./../notificationFirebase.service')
const Pix = require('../../dto/payment/Pix.Dto')

async function paymentForPix (originId, userId) {
  try {
    // Consultar Status Pagamento
    // Se status = false: gerarnova chave Pix
    // Se status = true/Paid ????

    const subscription = await ingressoClient.inscricaoPorIdOrigin(originId)

    const payDto = getSubscriptionPayDto(subscription)

    const expiresDate = moment().add(5, 'minutes')

    // payDto.PreDefinedOptions.Pix.expiresInMinutes = 5
    payDto.PreDefinedOptions.Pix.ExpireAtDateTime = expiresDate

    const data = await cognaPay.payForPix(payDto)

    if (!data.error) {
      // await save(payDto, userId, subscription)
      const res = new Pix(data)
      res.setExpiresIn(expiresDate)
      res.setTotalPrice(payDto.TotalAmount)
      return res
    }
  } catch (error) {
    throw new Error(error)
  }
}

async function save (payDto, userId, subscription) {
  let paymentData = await paymentRepository.findBy({ orderReference: payDto.OrderReference })
  if (!paymentData) {
    paymentData = {
      userId,
      paymentId: payDto.PaymentId,
      subscriptionKey: subscription.inscricao.businessKey,
      totalAmount: payDto.TotalAmount,
      origin: payDto.Origin,
      itemReference: payDto.Charges[0].ChargeReference,
      orderReference: payDto.OrderReference,
      studentReference: payDto.Student.RA,
      document: payDto.Student.CPF,
      typeOfPayment: 'PIX',
      paymentStatus: 'Generated'
    }

    await paymentRepository.insert(paymentData)
  }
}

async function notification (payment) {
  const paymentData = await paymentRepository.findBy({ orderReference: payment.OrderReference })

  if (!paymentData) {
    return
  }

  const updatedAt = moment().format('YYYY-MM-DD HH:mm:ss.SSS')

  const data = await paymentRepository.update(paymentData.id, { paymentId: payment.PaymentId, paymentStatus: payment.Status, updatedAt })

  console.log(data)

  const deviceRegisters = await RegisterAppRepository.filterBy({ UserId: paymentData.userId })

  if (deviceRegisters.length > 0) {
    const tokens = deviceRegisters.map(m => m.token)
    await NotificationFirebase.sendFromClient(tokens, 'Confirmação de pagamento', paymentData)
  }
}

module.exports = paymentForPix
