const axios = require('axios').create({ timeout: 6000000 })
const config = require('../../utils/config')
const {
  ClientServerError,
  ClientServerAuthError,
} = require('../../utils/errors')
const MessageResponse = require('../../dto/logger/MessageResponse')
const MessageRequest = require('../../dto/logger/MessageRequest')

const cognaPayConfig = { ...config.kroton.cognapay }

const urlBase = `${cognaPayConfig.url}/api/payment/GetPaymentByOrderReference?orderReference=`

module.exports = class PaymentPixStatus {
  constructor({ LoggerService, CognaPayGetToken }) {
    this.LoggerService = LoggerService
    this.CognaPayGetToken = CognaPayGetToken
  }

  get = async (orderReference, system) => {
    const token = await this.CognaPayGetToken.get(system)
    const step = this.LoggerService.addStep('CognaPayClientGetStatusRequest')
    const url = `${urlBase}${orderReference}`
    try {
      const res = await axios
        .get(url, {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        })
        .catch(function (error) {
          return error.response
        })

      step.finalize({
        response: new MessageResponse(res),
      })
      if (res.status === 200) {
        return res.data
      } else if (res.status === 404) {
        return null
      } else {
        throw res
      }
    } catch (error) {
      if (error instanceof ClientServerError) {
        throw error
      }

      if (error.status === 401) {
        const errorData = new ClientServerAuthError('Something went wrong', {
          client: url,
          errors: error.data,
        })
        throw errorData
      }

      const errorData = new ClientServerError('Something went wrong', {
        client: url,
        errors: error.data,
      })
      throw errorData
    }
  }
}
