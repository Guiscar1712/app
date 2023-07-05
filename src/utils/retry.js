const ClientServerAuthError = require('./errors/ClientServerAuthError')

async function retry (fn, params) {
  const maxRetries = 3
  let retryCount = 0

  while (retryCount < maxRetries) {
    try {
      const response = await fn(params)
      return response
    } catch (error) {
      if (error instanceof ClientServerAuthError) {
        delete process.env.TOKEN_INGRESSO
        retryCount++
        await new Promise(resolve => setTimeout(resolve, 100))
      } else {
        throw error
      }
    }
  }

  if (retryCount === maxRetries) {
    throw new Error(`Falha após ${maxRetries} tentativas.`)
  }
}

module.exports = retry
