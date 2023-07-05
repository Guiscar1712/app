require('dotenv').config()
const config = require('./config')
const ClientServerAuthError = require('./errors/ClientServerAuthError')
const ClientServerError = require('./errors/ClientServerError')
const maxRetries = config.kroton.ingresso.retries
const delayRetries = config.kroton.ingresso.delay

async function retry (fn, params) {
  let retryCount = 0

  while (retryCount < maxRetries) {
    try {
      const response = await fn(params)
      return response
    } catch (error) {
      if (error instanceof ClientServerAuthError) {
        delete process.env.KROTON_INGRESSO_TOKEN
        retryCount++
        await new Promise(resolve => setTimeout(resolve, delayRetries))
      } else {
        throw error
      }
    }
  }

  if (retryCount === maxRetries) {
    throw new ClientServerError(`Request failed in ${maxRetries} attempts.`, { function: fn, quantityTried: maxRetries })
  }
}

module.exports = retry
