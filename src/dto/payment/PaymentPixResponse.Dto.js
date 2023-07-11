class PaymentPixResponse {
  qrCode
  qrCodeUrl
  expiresIn
  totalAmount

  constructor (qrCode, qrCodeUrl, expiresIn, totalAmount) {
    this.qrCode = qrCode
    this.qrCodeUrl = qrCodeUrl
    this.expiresIn = expiresIn
    this.totalAmount = totalAmount
  }
}

module.exports = PaymentPixResponse
