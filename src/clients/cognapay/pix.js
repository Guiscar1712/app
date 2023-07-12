const axios = require('axios').create({ timeout: 6000000 })
const config = require('../../utils/config')
const { ClientServerError, ClientServerAuthError } = require('../../utils/errors')
const getToken = require('./token')

const cognaPayConfig = { ...config.kroton.cognapay }

const url = `${cognaPayConfig.url}/api/v2.5/Checkout`

async function main (body, origin) {
  try {
    const token = await getToken(origin)

    const res = await axios.post(
        `${url}`, body,
        {
          headers: {
            Authorization: 'Bearer ' + token
          }
        }
    ).catch(function (error) {
      return error.response
    })

    if (res.status === 201) {
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
