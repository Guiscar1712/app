const axios = require('axios').create({ timeout: 6000000 })
const config = require('../../utils/config')
const { ClientServerError, ClientServerAuthError } = require('../../utils/errors')
const getToken = require('./token')

const cognaPayConfig = { ...config.kroton.cognapay }

const url = `${cognaPayConfig.url}/api/payment/GetPaymentByOrderReference?orderReference=`

async function main (orderReference, system) {
  try {
    const token = await getToken(system)

    const res = await axios.get(
        `${url}${orderReference}`,
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
