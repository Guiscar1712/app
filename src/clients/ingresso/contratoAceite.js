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

class ContratoAceite {
  constructor ({ LoggerService }) {
    this.LoggerService = LoggerService
  }

  main = async ({ contractId, body }) => {
    const step = this.LoggerService.addStep('ContratoAceitoModule')
    try {
      const token = await getToken()
      const res = await axios.put(
        `${url}/${contractId}`,
        body,
        {
          headers: {
            'Ocp-Apim-Subscription-Key': ingresso.OcpApimSubscriptionKey,
            Authorization: 'Bearer ' + token
          }
        }
      ).catch(function (error) {
        step.finalize(contractId, body, error)
        return error.response
      })

      if (res.status === 200) {
        const system = res.data.labels.sistema.toUpperCase()
        // const businessKey = res.inscricao.businessKey
        this.LoggerService.setIndex({ sistema: system, contratoId: contractId })
        step.finalize({ status: res.status, data: res.data, headers: res.config.headers, method: res.config.method, url })
        return res.data
      }

      throw res
    } catch (error) {
      if (error instanceof ClientServerError) {
        step.finalize({ contractId, url, error })
        throw error
      }

      if (error.status === 401) {
        step.finalize({ contractId, url, error })
        throw new ClientServerAuthError('Something went wrong', { client: url, ...error.data })
      }

      step.finalize({ contractId, url, error })
      throw new ClientServerError('Something went wrong', { client: url, ...error.data })
    }
  }
}

module.exports = ContratoAceite
