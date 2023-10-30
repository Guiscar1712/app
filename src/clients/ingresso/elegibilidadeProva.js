const axios = require('../../config/axiosConfig')
const config = require('../../utils/config')
const ClientServerAuthError = require('../../utils/errors/ClientServerAuthError')
const ClientServerError = require('../../utils/errors/ClientServerError')
const getToken = require('./token')

const ingresso = {
  base_uri: config.kroton.ingresso.url,
  OcpApimSubscriptionKey: config.kroton.ingresso.OcpApimSubscriptionKey,
}

const url = `${ingresso.base_uri}/ms/inscricao/v4/captacao/prova-online/businesskey`

class ElegibilidadeProva {
  constructor({ LoggerService }) {
    this.LoggerService = LoggerService
  }

  request = async (subscriptionKey) => {
    const step = this.LoggerService.addStep(
      'IngressoClientElegibilidadeProvaRequest'
    )
    try {
      const token = await getToken()

      const res = await axios
        .get(`${url}/${subscriptionKey}`, {
          headers: {
            'Content-Type': 'application/json',
            'Ocp-Apim-Subscription-Key': ingresso.OcpApimSubscriptionKey,
            Authorization: token,
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

      if (res.status === 200) {
        return res.data
      }

      throw res
    } catch (error) {
      if (error instanceof ClientServerError) {
        throw error
      }

      if (error.status === 401) {
        throw new ClientServerAuthError('Access Denied', {
          client: url,
          ...error.data,
        })
      }

      throw new ClientServerError('Something went wrong', {
        client: url,
        ...error.data,
      })
    } finally {
      this.LoggerService.finalizeStep(step)
    }
  }
}

module.exports = ElegibilidadeProva
