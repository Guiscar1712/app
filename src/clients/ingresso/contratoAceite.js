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

class ContratoAceite {
  constructor({ LoggerService }) {
    this.LoggerService = LoggerService
  }

  request = async ({ contractId, body }) => {
    const step = this.LoggerService.addStep(
      'IngressoClientContratoAceitoRequest'
    )
    try {
      const token = await getToken()
      const res = await axios
        .put(`${url}/${contractId}`, body, {
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
        const system = res.data.labels.sistema.toUpperCase()
        this.LoggerService.setIndex({ system: system, contratoId: contractId })
        return res.data
      }

      throw res
    } catch (error) {
      if (error instanceof ClientServerError) {
        throw error
      }

      if (error.status === 401) {
        throw new ClientServerAuthError('Something went wrong', {
          client: url,
          errors: error.data,
        })
      }

      throw new ClientServerError('Something went wrong', {
        client: url,
        errors: error.data,
      })
    } finally {
      this.LoggerService.finalizeStep(step)
    }
  }
}

module.exports = ContratoAceite
