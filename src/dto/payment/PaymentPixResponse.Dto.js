class PaymentPixResponse {
  qrCode
  qrCodeUrl
  expiresIn
  totalAmount

  constructor (qrCode, qrCodeUrl, expiresIn, totalAmount) {
    this.qrCode = qrCode
    this.qrCodeUrl = qrCodeUrl
    this.totalAmount = totalAmount
    this.setExpiresIn(expiresIn)
  }

  setExpiresIn (expiresIn) {
    this.expiresIn = expiresIn.format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
  }
}

module.exports = PaymentPixResponse
