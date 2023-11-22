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

const url = `${ingresso.base_uri}/ms/inscricaocqrs/captacao/v5/inscricao`

class InscricaoPorIdOrigin {
  constructor({ LoggerService }) {
    this.LoggerService = LoggerService
  }

  request = async (originId) => {
    const step = this.LoggerService.addStep(
      'IngressoClientInscricaoPorIdOriginRequest'
    )
    try {
      const token = await getToken()

      const res = await axios
        .get(`${url}/${originId}`, {
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
      const system = res.data?.sistema?.toUpperCase()
      this.LoggerService.setIndex({
        system: system,
        originId,
      })

      if (res.status === 200) {
        const bk = res.data.inscricao.ofertas.primeiraOpcao.businessKey
        this.LoggerService.setIndex({
          businessKey: bk,
        })

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

module.exports = InscricaoPorIdOrigin
