require('dotenv').config()
const NodeCache = require('node-cache')
const ttl = process.env.CACHE_IN_MEMORY_TTL_SECONDS || 60
const cache = new NodeCache({ stdTTL: ttl })

async function cacheInMemory (fn, params) {
  const name = fn.name.toUpperCase()
  const key = 'CACHE_' + name
  const cachedData = cache.get(key)

  if (cachedData) {
    return cachedData
  }

  const data = await fn(params)
  cache.set(key, data)

  return data
}

module.exports = cacheInMemory
