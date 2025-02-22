const axios = require('../../config/axiosConfig')
const config = require('../../utils/config')
const ClientServerAuthError = require('../../utils/errors/ClientServerAuthError')
const ClientServerError = require('../../utils/errors/ClientServerError')
const getToken = require('./token')

const ingresso = {
  base_uri: config.kroton.ingresso.url,
  OcpApimSubscriptionKey: config.kroton.ingresso.OcpApimSubscriptionKey,
}

const url = `${ingresso.base_uri}/captacao/consultas/captacao/v1/consulta-provaonline/inscricao`

class ConsultaProva {
  constructor({ LoggerService }) {
    this.LoggerService = LoggerService
  }

  request = async (subscriptionKeyEncode) => {
    const step = this.LoggerService.addStep(
      'IngressoClientConsultaProvaRequest'
    )
    try {
      const token = await getToken()

      const res = await axios
        .get(`${url}/${subscriptionKeyEncode}`, {
          headers: {
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

module.exports = ConsultaProva
