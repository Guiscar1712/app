const axios = require('axios').create({ timeout: 1000000 })
const config = require('../../utils/config')
const logger = require('../../utils/logger.util')

const ingresso = {
  grant_type: 'client_credentials',
  client_id: config.kroton.ingresso.client_id,
  client_secret: config.kroton.ingresso.client_secret,
  base_uri: config.kroton.ingresso.url
}

async function main () {
  try {
    const body = new URLSearchParams({
      grant_type: ingresso.grant_type,
      client_id: ingresso.client_id,
      client_secret: ingresso.client_secret
    })

    const res = await axios.post(ingresso.base_uri + '/oauth2/token', body, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }
    }).catch(function (error) {
      return error.tokenresponse
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
