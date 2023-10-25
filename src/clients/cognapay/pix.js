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
    const step = this.LoggerService.addStep('CognaPayClientCheckoutRequest')
    const token = await this.CognaPayGetToken.request(system)
    try {
      const res = await axios
        .post(`${url}`, body, {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        })
        .catch(function (error) {
          step.value.addData({
            request: error.config,
            response: error.response,
          })
          return error.response
        })

      step.value.addData({
        request: res.config,
        response: res,
      })

      if (res.status === 201) {
        return res.data
      }

      throw res
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
    } finally {
      this.LoggerService.finalizeStep(step)
    }
  }
}
