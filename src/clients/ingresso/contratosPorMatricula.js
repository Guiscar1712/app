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

const url = `${ingresso.base_uri}/documento/geracaocontrato/v1/contrato/pendentes?labels=`

async function main(enrollmentId) {
  try {
    const token = await getToken()

    const param = `{"matricula":"${enrollmentId}"}`

    const res = await axios
      .get(`${url}${param}`, {
        headers: {
          'Ocp-Apim-Subscription-Key': ingresso.OcpApimSubscriptionKey,
          Authorization: 'Bearer ' + token
        }
      })
      .catch(function (error) {
        return error.response
      })

    if (res.status === 200) {
      return res.data
    } else if (res.status === 404) {
      return []
    }

    throw res
  } catch (error) {
    if (error instanceof ClientServerError) {
      throw error
    }

    if (error.status === 401) {
      throw new ClientServerAuthError('Something went wrong', {
        client: url,
        errors: error.data
      })
    }

    throw new ClientServerError('Something went wrong', {
      client: url,
      errors: error.data
    })
  }
}

module.exports = main
