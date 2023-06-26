const logger = require('./utils/logger.util')

const workerColaborar = require('./workers/receivePaymentConfirmationColaborar')
const workerOlimpo = require('./workers/receivePaymentConfirmationOlimpo')
const workerSap = require('./workers/receivePaymentConfirmationSap')

workerColaborar().catch((err) => {
  logger.error({ message: 'Worker Receiver Colaborar - ReceiveMessagesStreaming - Error occurred:', error: err })
  process.exit(1)
})

workerOlimpo().catch((err) => {
  logger.error({ message: 'Worker Receiver Olimpo - ReceiveMessagesStreaming - Error occurred:', error: err })
  process.exit(1)
})

workerSap().catch((err) => {
  logger.error({ message: 'Worker Receiver Sap - ReceiveMessagesStreaming - Error occurred:', error: err })
  process.exit(1)
})

const express = require('express')
const app = express()

const port = process.env.PORT || '3000'

app.get('/', (req, res) => {
  res.send('Worker receiver!')
})

app.listen(port, () => {
  console.log(`Ouvindo porta ${port}`)
})
