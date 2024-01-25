const express = require('express')
const cors = require('cors')
const morgan = require('./middlewares/morgan.middleware')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
dotenv.config()

const moment = require('moment-timezone')
const fusoHorarioGlobal = 'America/Sao_Paulo'
moment.tz.setDefault(fusoHorarioGlobal)

const container = require('./config/di')
const app = express()

app.use(cors())

app.use(morgan)
app.use(express.urlencoded({ extended: false, limit: '50mb' }))
app.use(express.json({ limit: '50mb' }))
app.use(cookieParser())

app.use((req, res, next) => {
  req.container = container.createScope()
  next()
})

app.use('/api', require('./routes'))

const swaggerConfig = require('./docs/swagger.config')
swaggerConfig(app)

module.exports = app
