require('dotenv').config()
const { error } = require('winston')
const config = require('./config')
const ClientServerAuthError = require('./errors/ClientServerAuthError')
const ClientServerError = require('./errors/ClientServerError')
const maxRetries = config.kroton.ingresso.retries
const delayRetries = config.kroton.ingresso.delay

async function retry(fn, params) {
  let retryCount = 0
  let response = {}

  while (retryCount < maxRetries) {
    try {
      response = await fn(params)
      return response
    } catch (error) {
      response = error
      if (error instanceof ClientServerAuthError) {
        delete process.env.KROTON_INGRESSO_TOKEN
        retryCount++
        await new Promise((resolve) => setTimeout(resolve, delayRetries))
      } else {
        throw error
      }
    }
  }

  if (retryCount === maxRetries) {
    if (response instanceof ClientServerAuthError) {
      throw new ClientServerError(`Request failed in ${maxRetries} attempts.`, {
        retry: true,
        quantityTried: maxRetries,
        ...response.errors,
      })
    } else {
      throw new ClientServerError(`Request failed in ${maxRetries} attempts.`, {
        function: fn.name,
        quantityTried: maxRetries,
        response: response.errors,
      })
    }
  }
}

module.exports = retry
