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

const url = `${ingresso.base_uri}/ms/inscricaocqrs/captacao/v5/inscricao`

async function main (idOrigin) {
  try {
    const token = await getToken()

    const res = await axios.get(
        `${url}/${idOrigin}`,
        {
          headers: {
            'Ocp-Apim-Subscription-Key': ingresso.OcpApimSubscriptionKey,
            Authorization: 'Bearer ' + token
          }
        }
    ).catch(function (error) {
      throw new ClientServerError(error.message, { client: url, ...error.data })
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
      throw new ClientServerAuthError('Something went wrong', { client: url, ...error.data })
    }

    throw new ClientServerError('Something went wrong', { client: url, ...error.data })
  }
}

module.exports = main
