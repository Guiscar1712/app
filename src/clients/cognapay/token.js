require('dotenv').config()
const jwt = require('jsonwebtoken')
const moment = require('moment')
const axios = require('axios').create({ timeout: 1000000 })
const config = require('../../utils/config')
const { ClientServerError, ClientServerAuthError } = require('../../utils/errors')

const cognaPayConfig = { ...config.kroton.cognapay }

const url = `${cognaPayConfig.url}/api/authentication/GenerateToken`

async function main (system) {
  try {
    const tokenCognapay = getTokenEnv(system)

    if (tokenCognapay === null) {
      return await getToken(system)
    }

    return tokenCognapay
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

async function getToken (system) {
  const auth = await getParams(system)

  const res = await axios.get(url, {
    auth
  }).catch(function (error) {
    return error.response
  })
  if (res.status === 200) {
    setTokenEnv(res.data, system)
    return res.data
  } else {
    throw res
  }
}

function getTokenEnv (system) {
  let tokenEnv

  if (system === 'COLABORAR') {
    tokenEnv = process.env.COGNAPAY_TOKEN_COLABORAR
  } else if (system === 'OLIMPO') {
    tokenEnv = process.env.COGNAPAY_TOKEN_OLIMPO
  } else if (system === 'SAP' || system === 'ATHENAS') {
    tokenEnv = process.env.COGNAPAY_TOKEN_SAP
  }

  if (tokenEnv === null || tokenEnv === undefined) {
    return null
  }

  const token = JSON.parse(tokenEnv)
  const dateExp = moment(token.expirationDate)
  const dateNow = moment()
  const diffInSeconds = dateExp.diff(dateNow, 'seconds')

  if (diffInSeconds <= 0) {
    return null
  }

  return token.accessToken
}

function setTokenEnv (accessToken, system) {
  const decodedToken = jwt.decode(accessToken)
  const expirationDateToken = moment(decodedToken.exp * 1000)
  const expirationDate = expirationDateToken.subtract(cognaPayConfig.tokenTolerance, 'minute')

  const token = {
    expirationDate,
    accessToken
  }

  const tokenStr = JSON.stringify(token)

  if (system === 'COLABORAR') {
    process.env.COGNAPAY_TOKEN_COLABORAR = tokenStr
  } else if (system === 'OLIMPO') {
    process.env.COGNAPAY_TOKEN_OLIMPO = tokenStr
  } else if (system === 'SAP' || system === 'ATHENAS') {
    process.env.COGNAPAY_TOKEN_SAP = tokenStr
  }
}

function getParams (system) {
  if (system === 'COLABORAR') {
    return { ...cognaPayConfig.colaborar }
  } else if (system === 'OLIMPO') {
    return { ...cognaPayConfig.olimpo }
  } else if (system === 'SAP' || system === 'ATHENAS') {
    return { ...cognaPayConfig.sap }
  }
}

module.exports = main
