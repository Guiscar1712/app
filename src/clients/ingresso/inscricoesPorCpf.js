const axios = require('axios').create({ timeout: 1000000 })
const config = require('../../utils/config')
const ClientServerError = require('../../utils/errors/ClientServerError')
const getToken = require('./token')

const ingresso = {
  grant_type: 'client_credentials',
  client_id: config.kroton.ingresso.client_id,
  client_secret: config.kroton.ingresso.client_secret,
  base_uri: config.kroton.ingresso.url,
  OcpApimSubscriptionKey: config.kroton.ingresso.OcpApimSubscriptionKey
}

const url = `${ingresso.base_uri}/ms/inscricaocqrs/captacao/v5/inscricao/cpf`

async function main (cpf, token) {
  try {
    const token = await getToken()

    const res = await axios.get(
        `${url}/${cpf}`,
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
    } else if (res.status === 401) {
      // retry
    }
  } catch (error) {
    if (error instanceof ClientServerError) {
      throw error
    }

    throw new ClientServerError('Something went wrong', { client: url, ...error.data })
  }
}

module.exports = main
