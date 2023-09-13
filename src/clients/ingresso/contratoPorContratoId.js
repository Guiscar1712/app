const axios = require('axios').create({ timeout: 1000000 })
const config = require('../../utils/config')
const ClientServerAuthError = require('../../utils/errors/ClientServerAuthError')
const ClientServerError = require('../../utils/errors/ClientServerError')
const getToken = require('./token')

const ingresso = {
  grant_type: 'client_credentials',
  client_id: config.kroton.ingresso.client_id,
  client_secret: config.kroton.ingresso.client_secret,
  base_uri: config.kroton.ingresso.url,
  OcpApimSubscriptionKey: config.kroton.ingresso.OcpApimSubscriptionKey
}

const url = `${ingresso.base_uri}/documento/geracaocontrato/v1/contrato`

class ContratoPorContratoId {
  constructor ({ LoggerService }) {
    this.LoggerService = LoggerService
  }

  main = async (contratoId) => {
    const step = this.LoggerService.addStep('ContratoPorContratoIdModule')
    try {
      const token = await getToken()

      const param = `${contratoId}/html`

      const res = await axios.get(
        `${url}/${param}`,
        {
          headers: {
            'Ocp-Apim-Subscription-Key': ingresso.OcpApimSubscriptionKey,
            Authorization: 'Bearer ' + token
          }
        }
      ).catch(function (error) {
        step.finalize(contratoId, error)
        return error.response
      })

      if (res.status === 200) {
        this.LoggerService.setIndex({ contratoId })

        step.finalize({ status: res.status, data: res.data, headers: res.config.headers, method: 'GET', url })
        return res.data
      }

      throw res
    } catch (error) {
      if (error instanceof ClientServerError) {
        step.finalize({ contratoId, url, error })
        throw error
      }

      if (error.status === 401) {
        step.finalize({ contratoId, url, error })
        throw new ClientServerAuthError('Algo deu errado', { client: url, ...error.data })
      }

      step.finalize({ contratoId, url, error })
      throw new ClientServerError('Algo deu errado', { client: url, ...error.data })
    }
  }
}

module.exports = ContratoPorContratoId
