const express = require('express')
const cors = require('cors')
const logger = require('./utils/logger.util')
const morgan = require('./middlewares/morgan.middleware')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
dotenv.config()

const app = express()

app.use(morgan)
app.use(cors())

app.use(express.urlencoded({ extended: false, limit: '50mb' }))
app.use(express.json({ limit: '50mb' }))
app.use(cookieParser())

app.use(require('./routes'))

app.use(function (error, _, response, next) {
  response.locals.message = error.message

  response.locals.error = error

  logger.error(JSON.stringify(error, Object.getOwnPropertyNames(error)))

  return response.status(error.status || 500).send({
    message: error.message,
    stack: error.stack
  })
})

module.exports = app
