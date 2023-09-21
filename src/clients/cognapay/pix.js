const axios = require('../../config/axiosConfig')
const config = require('../../utils/config')
const {
  ClientServerError,
  ClientServerAuthError,
} = require('../../utils/errors')
const cognaPayConfig = { ...config.kroton.cognapay }
const url = `${cognaPayConfig.url}/api/v2.5/Checkout`
module.exports = class PaymentPix {
  constructor({ LoggerService, CognaPayGetToken }) {
    this.LoggerService = LoggerService
    this.CognaPayGetToken = CognaPayGetToken
  }

  request = async (body, system) => {
    const token = await this.CognaPayGetToken.request(system)
    const step = this.LoggerService.addStep('CognaPayClientCheckoutRequest')
    try {
      const res = await axios
        .post(`${url}`, body, {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        })
        .catch(function (error) {
          return error.response
        })

      if (res.status === 201) {
        step.finalize({
          request: res.config,
          response: res,
        })
        return res.data
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
