const axios = require('../../config/axiosConfig')
const config = require('../../utils/config')
const ClientServerAuthError = require('../../utils/errors/ClientServerAuthError')
const ClientServerError = require('../../utils/errors/ClientServerError')
const getToken = require('./token')

const ingresso = {
  grant_type: 'client_credentials',
  client_id: config.kroton.ingresso.client_id,
  client_secret: config.kroton.ingresso.client_secret,
  base_uri: config.kroton.ingresso.url,
  OcpApimSubscriptionKey: config.kroton.ingresso.OcpApimSubscriptionKey,
}

const urlBase = `${ingresso.base_uri}/financeiro/v4/pagamentos`

module.exports = class DadosPagamento {
  constructor({ LoggerService }) {
    this.LoggerService = LoggerService
  }

  request = async (businessKey) => {
    const step = this.LoggerService.addStep(
      'IngressoClientOrderRefecenceRequest'
    )
    const url = `${urlBase}/${businessKey}`
    try {
      const token = await getToken()

      const res = await axios
        .get(url, {
          headers: {
            'Ocp-Apim-Subscription-Key': ingresso.OcpApimSubscriptionKey,
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

      step.value.addData({ request: res.config, response: res })

      if (res.status === 200) {
        return res.data
      }

      throw res
    } catch (error) {
      let errorData
      if (error.status === 401) {
        errorData = new ClientServerAuthError('Not authorized', {
          client: url,
          errors: error.data,
        })
      } else {
        errorData = new ClientServerError('Something went wrong', {
          client: url,
          errors: error.data,
        })
      }
      throw errorData
    } finally {
      this.LoggerService.finalizeStep(step)
    }
  }
}
