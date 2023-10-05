const express = require('express')
const cors = require('cors')
const morgan = require('./middlewares/morgan.middleware')
// const errorHandler = require('./middlewares/errorHandler')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
dotenv.config()

const moment = require('moment-timezone')
const fusoHorarioGlobal = 'America/Sao_Paulo'
moment.tz.setDefault(fusoHorarioGlobal)

const { asClass } = require('awilix')
const container = require('./config/di')
const app = express()

app.use(morgan)
app.use(cors())

app.use(express.urlencoded({ extended: false, limit: '50mb' }))
app.use(express.json({ limit: '50mb' }))
app.use(cookieParser())

app.use(require('./routes'))

app.use((req, res, next) => {
  req.container = container.createScope()

  //   const { initLogger } = req.container.cradle
  //   req.container.LoggerService = initLogger()

  //   req.container.register({
  //     LoggerService: asClass(req.container.LoggerService).scoped(),
  //   })

  next()
})

app.use('/api/v1', require('./routes/v1'))
app.use('/api/v2', require('./routes/v2'))

module.exports = app
