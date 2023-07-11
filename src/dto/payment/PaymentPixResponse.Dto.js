class PaymentPixResponse {
  qrCode
  qrCodeUrl
  expiresIn
  totalPrice

  constructor (qrCode, qrCodeUrl, expiresIn, totalPrice) {
    this.qrCode = qrCode
    this.qrCodeUrl = qrCodeUrl
    this.expiresIn = expiresIn
    this.totalPrice = totalPrice
  }
}

module.exports = PaymentPixResponse
