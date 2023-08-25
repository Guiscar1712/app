const axios = require('axios').create({ timeout: 6000000 })
const config = require('../../utils/config')
const { ClientServerError, ClientServerAuthError } = require('../../utils/errors')
const getToken = require('./token')

const cognaPayConfig = { ...config.kroton.cognapay }

const url = `${cognaPayConfig.url}/api/v2.5/Checkout`

module.exports = class PaymentPix {
  constructor ({ LoggerService }) {
    this.LoggerService = LoggerService
  }

  get = async (body, system) => {
    const step = this.LoggerService.addStep('PaymentPixGet')
    try {
      const token = await getToken(system)

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
        step.finalize({ body, system, data: res.data })
        return res.data
      } else {
        throw res
      }
    } catch (error) {
      if (error instanceof ClientServerError) {
        step.finalize({ body, system, error })
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
