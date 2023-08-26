const axios = require('axios').create({ timeout: 6000000 })
const config = require('../../utils/config')
const { ClientServerError, ClientServerAuthError } = require('../../utils/errors')
const cognaPayConfig = { ...config.kroton.cognapay }

const url = `${cognaPayConfig.url}/api/v2.5/Checkout`

module.exports = class PaymentPix {
  constructor ({ LoggerService, CognaPayGetToken }) {
    this.LoggerService = LoggerService
    this.CognaPayGetToken = CognaPayGetToken
  }

  get = async (body, system) => {
    const step = this.LoggerService.addStep('CognaPayClientGetPix')
    try {
      const token = await this.CognaPayGetToken.get(system)

      const res = await axios.post(
        `${url}`, body,
        {
          headers: {
            Authorization: 'Bearer ' + token
          }
        }
      ).catch(function (error) {
        return error.response
      })

      if (res.status === 201) {
        step.finalize({ url, body, system, data: res.data })
        return res.data
      } else {
        throw res
      }
    } catch (error) {
      if (error instanceof ClientServerError) {
        step.finalize({ url, body, system, error })
        throw error
      }

      if (error.status === 401) {
        const errorData = new ClientServerAuthError('Something went wrong', { client: url, errors: error.data })
        step.finalize({ body, system, errorData })
        throw errorData
      }

      const errorData = new ClientServerError('Something went wrong', { client: url, errors: error.data })
      step.finalize({ body, system, errorData })
      throw errorData
    }
  }
}
