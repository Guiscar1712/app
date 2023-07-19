const express = require('express')
const cors = require('cors')
const morgan = require('./middlewares/morgan.middleware')
const errorHandler = require('./middlewares/errorHandler')
const cookieParser = require('cookie-parser')
const dotenv = require('dotenv')
dotenv.config()

const moment = require('moment-timezone')
const fusoHorarioGlobal = 'America/Sao_Paulo'
moment.tz.setDefault(fusoHorarioGlobal)

const app = express()

app.use(morgan)
app.use(cors())

app.use(express.urlencoded({ extended: false, limit: '50mb' }))
app.use(express.json({ limit: '50mb' }))
app.use(cookieParser())

app.use(require('./routes'))
app.use('/api/v1', require('./routes/v1'))

app.use(errorHandler)

module.exports = app
