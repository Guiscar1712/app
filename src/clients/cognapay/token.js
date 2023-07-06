require('dotenv').config()
const axios = require('axios').create({ timeout: 1000000 })
const config = require('../../utils/config')
const logger = require('../../utils/logger.util')

const cognaPayConfig = { ...config.kroton.cognapay }

async function main (origin) {
  try {
    const auth = await getParams(origin)

    const res = await axios.get(`${cognaPayConfig.url}/api/authentication/GenerateToken`, {
      auth
    }).catch(function (error) {
      return error.response
    })
    if (res.status === 200) {
      return res.data
    } else {
      throw res
    }
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

async function getParams (origin) {
  if (origin === 'COLABORAR') {
    return { ...cognaPayConfig.colaborar }
  } else if (origin === 'OLIMPO') {
    return { ...cognaPayConfig.olimpo }
  } else if (origin === 'SAP') {
    return { ...cognaPayConfig.sap }
  }
}

// token.get('COLABORAR')
// token.get('OLIMPO')
// token.get('SAP')

module.exports = main
