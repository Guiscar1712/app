const axios = require('axios')

const instance = axios.create({ timeout: 180000 }) // 3 minutos

axios.interceptors.request.use((req) => {
  req.meta = req.meta || {}
  req.meta.url = req.url
  req.meta.type = req.method
  req.meta.headers = req.headers
  req.meta.body = req.body
  req.meta.params = req.params
  req.meta.query = req.query

  return req
})

module.exports = instance
