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

app.use(
  require('./routes')
  // #swagger.ignore = true
)

app.use((req, res, next) => {
  req.container = container.createScope()
  next()
})

const apiV1 = require('./routes/v1')
const apiV2 = require('./routes/v2')

app.use(
  '/api/v1',
  apiV1
  /*  #swagger.responses[400] = { 
        schema: { $ref: "#/definitions/response400" },
        description: "Invalid parameters" } */

  /*  #swagger.responses[500] = { 
        schema: { $ref: "#/definitions/response500" },
        description: "Server errors" } */
)

app.use(
  '/api/v2',
  apiV2
  /*  #swagger.responses[400] = { 
        schema: { $ref: "#/definitions/response400" },
        description: "Invalid parameters" } */

  /*  #swagger.responses[500] = { 
        schema: { $ref: "#/definitions/response500" },
        description: "Server errors" } */
)

const docs =
  process.env.NODE_ENV == 'homolog' || process.env.NODE_ENV == 'development'

const swaggerUi = require('swagger-ui-express')
const swaggerFile = require('./docs/swagger-output.json')

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile))

module.exports = app
