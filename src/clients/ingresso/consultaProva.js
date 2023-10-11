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
          throw new ClientServerError(error.message, {
            request: error.config,
          })
        })

      if (res.status === 200) {
        step.finalize({
          request: res.config,
          response: res,
        })

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
    }
  }
}

module.exports = ConsultaProva
