class Pix {
  qrCode
  qrCodeUrl
  expiresIn
  totalPrice

  constructor (data) {
    this.qrcode = data.qrCode
    this.qrCodeUrl = data.qrCodeUrl
  }

  setExpiresIn (date) {
    this.expiresIn = date
  }

  setTotalPrice (price) {
    this.totalPrice = price
  }
}

module.exports = Pix
