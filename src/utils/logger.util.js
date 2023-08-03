require('dotenv').config()
const winston = require('winston')
require('winston-daily-rotate-file')

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  debug: 4
}

const level = () => {
  const env = process.env.NODE_ENV || 'development'
  const isDevelopment = env === 'development'
  return isDevelopment ? 'debug' : 'warn'
}

const colors = {
  error: 'red',
  warn: 'yellow',
  info: 'green',
  http: 'magenta',
  debug: 'white'
}

winston.addColors(colors)

const format = winston.format.combine(
  winston.format.timestamp({ format: 'YYYY-MM-DD HH:mm:ss:ms' }),
  winston.format.json()
  // winston.format.printf((info) => `${info.timestamp} ${info.level}: ${info.message}`)
)
const APPLICATION_NAME = process.env.APPLICATION_NAME
const DATADOG_API_KEY = process.env.DATADOG_API_KEY

const dataDog = new winston.transports.Http({
  host: 'http-intake.logs.us5.datadoghq.com',
  path: `/api/v2/logs?dd-api-key=${DATADOG_API_KEY}&ddsource=nodejs&service=${APPLICATION_NAME}`,
  ssl: true
})

const transports = [
  new winston.transports.Console({
    format: winston.format.combine(
      format,
      winston.format.colorize({ all: true })
    )
  }),
  new winston.transports.File({
    filename: 'logs/error.log',
    maxsize: 20971520, // 20MB
    level: 'error'
  }),
  new winston.transports.DailyRotateFile({
    filename: 'logs/%DATE%.info.log',
    datePattern: 'YYYY-MM-DD-HH',
    zippedArchive: true,
    maxSize: '20m',
    maxFiles: '7d'
  }),
  dataDog
]

const Logger = winston.createLogger({
  level: level(),
  levels,
  format,
  transports
})

module.exports = Logger
