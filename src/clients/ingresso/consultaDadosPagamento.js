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

const url = `${ingresso.base_uri}/financeiro/v4/pagamentos/`

async function main (businessKey) {
  try {
    const token = await getToken()

    const res = await axios.get(
        `${url}/${businessKey}`,
        {
          headers: {
            'Ocp-Apim-Subscription-Key': ingresso.OcpApimSubscriptionKey,
            Authorization: 'Bearer ' + token
          }
        }
    ).catch(function (error) {
      return error.response
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
