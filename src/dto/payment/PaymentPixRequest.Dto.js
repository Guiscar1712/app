const moment = require('moment')
const PaymentRequest = require('./PaymentRequest.Dto')

const expiresInMinutes = process.env.KROTON_INGRESSO_PAYMENT_PIX_EXPIRESDATE || 5

class PaymentPixRequest extends PaymentRequest {
  constructor (data) {
    super(data)
    this.preDefinedOptions = this.setPreDefinedOptions(data)
    this.fundingOptions = this.setPreDefinedOptions(data)
  }

  setPreDefinedOptions () {
    const dateNow = moment()
    const expiresDate = dateNow.add(expiresInMinutes, 'minutes')
    return {
      Pix: {
        DirectPix: true,
        ExpireAtDateTime: expiresDate
      }
    }
  }
}

module.exports = PaymentPixRequest
