class PaymentNotification {
  title
  body
  data

  constructor (data) {
    this.title = `Notificação de Pagamento de ${data.invoiceType}`
    this.body = `Confirmação de pagamento via ${data.paymentType}`
    this.data = new Data(data)
  }
}

class Data {
  invoiceType
  notificationType
  paymentType
  statusPayment
  idOrigin
  totalAmount
  paymentDate

  constructor (data) {
    this.invoiceType = data.invoiceType
    this.notificationType = 'PAYMENT'
    this.paymentType = data.paymentType
    this.statusPayment = data.statusPayment
    this.idOrigin = data.originId?.toString()
    this.totalAmount = data.totalAmount?.toString()
    this.paymentDate = data.paymentDate
  }
}

module.exports = PaymentNotification
