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

const url = `${ingresso.base_uri}/ms/dadospessoais/captacao/v1/dadospessoais`

class PersonalDataUpdate {
  constructor({ LoggerService }) {
    this.LoggerService = LoggerService
  }

  request = async (body) => {
    const step = this.LoggerService.addStep('IngressoClientPersonalDataRequest')
    try {
      const token = await getToken()

      const res = await axios
        .post(`${url}`, body, {
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

        step.value.addData({
          request: res.config,
          response: res,
        })
        
        if (res.status === 201) {
        const { status, statusText } = { ...res }
        return { status, statusText }
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

module.exports = PersonalDataUpdate
