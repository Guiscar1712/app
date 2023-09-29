module.exports = class CognaPayClient {
  constructor({
    LoggerService,
    CognaPayGetToken,
    CognaPayPaymentPix,
    CognaPayPaymentPixStatus,
  }) {
    this.LoggerService = LoggerService
    this.CognaPayGetToken = CognaPayGetToken
    this.CognaPayPaymentPix = CognaPayPaymentPix
    this.CognaPayPaymentPixStatus = CognaPayPaymentPixStatus
  }

  getToken = async ({ system }) => {
    return await this.CognaPayGetToken.request(system)
  }

  payForPix = async ({ body, system }) => {
    return await this.CognaPayPaymentPix.request(body, system)
  }

  getPaymentStatus = async ({ orderReference, system }) => {
    return await this.CognaPayPaymentPixStatus.request(orderReference, system)
  }
}
