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

const url = `${ingresso.base_uri}/documento/geracaocontrato/v1/contrato`

class ContratoPorContratoId {
  constructor({ LoggerService }) {
    this.LoggerService = LoggerService
  }

  request = async (contratoId) => {
    const step = this.LoggerService.addStep(
      'IngressoClientContratoPorContratoIdRequest'
    )
    try {
      const token = await getToken()

      const param = `${contratoId}/html`

      const res = await axios
        .get(`${url}/${param}`, {
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

      if (res.status === 200) {
        this.LoggerService.setIndex({ contratoId })
        return res.data
      }

      throw res
    } catch (error) {
      if (error instanceof ClientServerError) {
        throw error
      }

      if (error.status === 401) {
        throw new ClientServerAuthError('Algo deu errado', {
          client: url,
          errors: error.data,
        })
      }

      throw new ClientServerError('Algo deu errado', {
        client: url,
        errors: error.data,
      })
    } finally {
      this.LoggerService.finalizeStep(step)
    }
  }
}

module.exports = ContratoPorContratoId
