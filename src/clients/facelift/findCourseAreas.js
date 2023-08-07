const axios = require('axios').create({ timeout: 1000000 })
const ClientServerAuthError = require('../../utils/errors/ClientServerAuthError')
const ClientServerError = require('../../utils/errors/ClientServerError')

const facelit = {
  base_uri: process.env.KROTON_API_BASE_URL,
  apiKey: process.env.KROTON_API_X_ACCESS_KEY
}

const url = `${facelit.base_uri}/course-areas`

async function main () {
  try {
    const res = await axios.get(
        `${url}`,
        {
          headers: {
            'X-Access-Key': facelit.apiKey
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
      throw new ClientServerAuthError('Something went wrong', { client: url, errors: error.data })
    }

    throw new ClientServerError('Something went wrong', { client: url, errors: error.data })
  }
}

module.exports = main
