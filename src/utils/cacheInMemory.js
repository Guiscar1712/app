require('dotenv').config()
const NodeCache = require('node-cache')
const cache = new NodeCache({ stdTTL: 30 }) // 3600

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
