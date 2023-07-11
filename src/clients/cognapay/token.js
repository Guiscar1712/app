require('dotenv').config()
const jwt = require('jsonwebtoken')
const moment = require('moment')
const axios = require('axios').create({ timeout: 1000000 })
const config = require('../../utils/config')
const logger = require('../../utils/logger.util')

const cognaPayConfig = { ...config.kroton.cognapay }

const url = `${cognaPayConfig.url}/api/authentication/GenerateToken`

async function main (origin) {
  try {
    const tokenCognapay = getTokenEnv(origin)

    if (tokenCognapay === null) {
      return await getToken(origin)
    }

    return tokenCognapay
  } catch (error) {
    const errorLog = {
      function: 'clients.cognapay.token.get()'
    }

    if (error.status >= 400 && error.status <= 499) {
      errorLog.code = 400100
      errorLog.message = ''
      errorLog.clientError = error.data
    } else {
      errorLog.code = 500100
      errorLog.message = ''
      errorLog.serverError = error
    }

    logger.error(errorLog)
  }
}

async function getToken (origin) {
  const auth = await getParams(origin)

  const res = await axios.get(url, {
    auth
  }).catch(function (error) {
    return error.response
  })
  if (res.status === 200) {
    setTokenEnv(res.data, origin)
    return res.data
  } else {
    throw res
  }
}

function getTokenEnv (origin) {
  let tokenEnv

  if (origin === 'COLABORAR') {
    tokenEnv = process.env.COGNAPAY_TOKEN_COLABORAR
  } else if (origin === 'OLIMPO') {
    tokenEnv = process.env.COGNAPAY_TOKEN_OLIMPO
  } else if (origin === 'SAP') {
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

function setTokenEnv (accessToken, origin) {
  const decodedToken = jwt.decode(accessToken)
  const expirationDateToken = moment(decodedToken.exp * 1000)
  const expirationDate = expirationDateToken.subtract(cognaPayConfig.tokenTolerance, 'minute')

  const token = {
    expirationDate,
    accessToken
  }

  const tokenStr = JSON.stringify(token)

  if (origin === 'COLABORAR') {
    process.env.COGNAPAY_TOKEN_COLABORAR = tokenStr
  } else if (origin === 'OLIMPO') {
    process.env.COGNAPAY_TOKEN_OLIMPO = tokenStr
  } else if (origin === 'SAP') {
    process.env.COGNAPAY_TOKEN_SAP = tokenStr
  }
}

function getParams (origin) {
  if (origin === 'COLABORAR') {
    return { ...cognaPayConfig.colaborar }
  } else if (origin === 'OLIMPO') {
    return { ...cognaPayConfig.olimpo }
  } else if (origin === 'SAP') {
    return { ...cognaPayConfig.sap }
  }
}

module.exports = main
