const axios = require('axios').create({ timeout: 1000000 })
const config = require('../../utils/config')
const logger = require('../../utils/logger.util')
const ingressoConstant = require('./constant')
const getToken = require('./getToken')

const ingresso = {
  grant_type: 'client_credentials',
  client_id: config.kroton.ingresso.client_id,
  client_secret: config.kroton.ingresso.client_secret,
  base_uri: config.kroton.ingresso.url,
  OcpApimSubscriptionKey: config.kroton.ingresso.OcpApimSubscriptionKey
}

class inscricao {
  static async get (subscriptionKey, token) {
    try {
      if (!token) {
        token = await getToken.get()
      }

      const res = await axios.get(
        `${ingresso.base_uri}/ms/inscricaocqrs/captacao/v5/inscricao/${subscriptionKey}`,
        {
          headers: {
            'Ocp-Apim-Subscription-Key': ingresso.OcpApimSubscriptionKey,
            Authorization: 'Bearer ' + token.access_token
          }
        }
      ).catch(function (error) {
        return error.response
      })

      if (res.status === 200) {
        return res.data
      } else {
        throw res
      }
    } catch (error) {
      const errorLog = {
        function: 'clients.ingresso.token.get()'
      }

      if (error.status >= 400 && error.status <= 499) {
        errorLog.code = 400100
        errorLog.message = ingressoConstant.clientErrorClient.message
        errorLog.clientError = error.data
      } else {
        errorLog.code = 500100
        errorLog.message = ingressoConstant.serverErrorClient.message
        errorLog.serverError = error
      }

      logger.error(errorLog)
    }
  }
}

module.exports = inscricao
