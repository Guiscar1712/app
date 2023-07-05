require('dotenv').config()
const moment = require('moment')
const axios = require('axios').create({ timeout: 1000000 })
const config = require('../../utils/config')
const ClientServerError = require('../../utils/errors/ClientServerError')

const ingresso = {
  grant_type: 'client_credentials',
  client_id: config.kroton.ingresso.client_id,
  client_secret: config.kroton.ingresso.client_secret,
  base_uri: config.kroton.ingresso.url,
  tolerance: config.kroton.ingresso.tolerance
}
const url = `${ingresso.base_uri}/oauth2/token`

async function main () {
  const tokenIngresso = process.env.KROTON_INGRESSO_TOKEN
  try {
    if (tokenIngresso === null || tokenIngresso === undefined) {
      return getToken()
    }
    const token = JSON.parse(tokenIngresso)

    const createAt = moment(token.createdAt)
    const dateNow = moment()
    const diffInSeconds = dateNow.diff(createAt, 'seconds')
    const expiresIn = parseInt(token.data.expires_in, 10)

    if (diffInSeconds >= expiresIn) {
      return getToken()
    }

    return token.data.access_token
  } catch (error) {
    throw new ClientServerError('Something went wrong', { client: url, ...error.data })
  }
}

module.exports = main

async function getToken () {
  const body = new URLSearchParams({
    grant_type: ingresso.grant_type,
    client_id: ingresso.client_id,
    client_secret: ingresso.client_secret
  })

  const res = await axios.post(url, body, {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded'
    }
  }).catch(function (error) {
    return error.response
  })

  if (res.status === 200) {
    const dateNow = moment().subtract(ingresso.tolerance, 'minute')

    process.env.KROTON_INGRESSO_TOKEN = JSON.stringify({
      createdAt: dateNow,
      data: res.data
    })

    return res.data.access_token
  }
}
