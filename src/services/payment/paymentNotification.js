const moment = require('moment')
const paymentRepository = require('../../repositories/PaymentRepository')
const RegisterAppRepository = require('./../../repositories/RegisterAppRepository')
const NotificationFirebase = require('./../notificationFirebase.service')

async function paymentNotification (payment) {
  // Alterar tabela de notificações => feito
  // Salvar notifica na tabela de notificações => não vai ser realizado
  // enviar notificação => Feito

  const paymentData = await paymentRepository.findBy({ orderReference: payment.OrderReference })

  if (!paymentData) {
    return
  }

  const updatedAt = moment().format('YYYY-MM-DD HH:mm:ss.SSS')

  await paymentRepository.update(paymentData.id, { paymentStatus: payment.Status, updatedAt })

  if (payment.Status.toUpperCase() !== 'PAID') {
    return
  }

  const deviceRegisters = await RegisterAppRepository.filterBy({ UserId: paymentData.userId })
  if (deviceRegisters.length > 0) {
    const tokens = deviceRegisters.map(m => m.token)
    const message = {
      title: `Notificação de Pagamento de ${payment.InvoiceType}`,
      body: `Confirmação de pagamento via ${payment.PaymentType}`,
      data: {
        invoiceType: paymentData.invoiceType,
        notificationType: 'PAYMENT',
        paymentType: paymentData.paymentType,
        status: payment.Status.toUpperCase(),
        idOrigin: '12704478',
        totalAmount: payment.TotalAmount,
        paymentDate: payment.PaymentDate
      }
    }

    await NotificationFirebase.sendFromClient(tokens, message)
  }
}

// Teste Mock
/* paymentNotification({
  OrderReference: '104-1689204066754',
  PaymentId: '465465',
  Status: 'PAID',
  InvoiceType: 'PreMatricula',
  PaymentType: 'PIX',
  PaymentDate: '2023-07-12T09:52:18.6406672+00:00',
  TotalAmount: '9.9'
}) */

module.exports = paymentNotification
