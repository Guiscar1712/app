const axios = require('axios').create({ timeout: 1000000 })
const config = require('../../utils/config')
const logger = require('../../utils/logger.util')
const getToken = require('./token')

const ingresso = {
  grant_type: 'client_credentials',
  client_id: config.kroton.ingresso.client_id,
  client_secret: config.kroton.ingresso.client_secret,
  base_uri: config.kroton.ingresso.url,
  OcpApimSubscriptionKey: config.kroton.ingresso.OcpApimSubscriptionKey
}

async function main (cpf, token) {
  try {
    if (!token) {
      token = await getToken()
    }

    const res = await axios.get(
        `${ingresso.base_uri}/ms/inscricaocqrs/captacao/v5/inscricao/cpf/${cpf}`,
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
    logger.error(error)
  }
}

module.exports = main
