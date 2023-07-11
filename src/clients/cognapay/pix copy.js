const axios = require('axios').create({ timeout: 6000000 })
const config = require('../../utils/config')
const logger = require('../../utils/logger.util')
const getToken = require('./token')

const cognaPayConfig = { ...config.kroton.cognapay }

async function main (orderReference, origin) {
  try {
    const token = await getToken(origin)

    const res = await axios.get(
        `${cognaPayConfig.url}/api/payment/GetPaymentByOrderReference?orderReference=${orderReference}`,
        {
          headers: {
            Authorization: 'Bearer ' + token
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
    let errorLog = {}

    if (error.status >= 400 && error.status <= 499) {
      errorLog = {
        code: 400,
        message: 'Client Error',
        data: error.data
      }
    } else {
      errorLog = {
        code: 500,
        message: 'Server Error',
        data: error
      }
    }

    logger.error(errorLog)

    return { error: errorLog }
  }
}

// paymentPix.get('COLABORAR')
// paymentPix.get('OLIMPO')
// paymentPix.get('SAP')

module.exports = main
