const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const logger = require('./utils/logger.util')
const morgan = require('./middlewares/morgan.middleware')

dotenv.config()

const app = express()

app.use(morgan)
app.use(cors())

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use(require('./routes'))

app.use(function (error, _, response, next) {
  response.locals.message = error.message

  response.locals.error = error

  logger.error(JSON.stringify(error))

  return response.status(error.status || 500).send({
    message: error.message,
    stack: error.stack
  })
})

module.exports = app
