const axios = require('axios').create({ timeout: 6000000 })
const config = require('../../utils/config')
const { ClientServerError, ClientServerAuthError } = require('../../utils/errors')

const cognaPayConfig = { ...config.kroton.cognapay }

const urlBase = `${cognaPayConfig.url}/api/payment/GetPaymentByOrderReference?orderReference=`

module.exports = class PaymentPixStatus {
  constructor ({ LoggerService, CognaPayGetToken }) {
    this.LoggerService = LoggerService
    this.CognaPayGetToken = CognaPayGetToken
  }

  get = async (orderReference, system) => {
    const step = this.LoggerService.addStep('CognaPayClientGetStatus')
    const url = `${urlBase}${orderReference}`
    try {
      const token = await this.CognaPayGetToken.get(system)

      const res = await axios.get(
        url,
        {
          headers: {
            Authorization: 'Bearer ' + token
          }
        }
      ).catch(function (error) {
        return error.response
      })

      if (res.status === 200) {
        step.finalize({ url, orderReference, system, data: res.data })
        return res.data
      } else if (res.status === 404) {
        step.finalize({ url, orderReference, system, data: res })
        return null
      } else {
        throw res
      }
    } catch (error) {
      if (error instanceof ClientServerError) {
        step.finalize({ url, orderReference, system, error })
        throw error
      }

      if (error.status === 401) {
        const errorData = new ClientServerAuthError('Something went wrong', { client: url, errors: error.data })
        step.finalize({ orderReference, system, errorData })
        throw errorData
      }

      const errorData = new ClientServerError('Something went wrong', { client: url, errors: error.data })
      step.finalize({ orderReference, system, errorData })
      throw errorData
    }
  }
}
