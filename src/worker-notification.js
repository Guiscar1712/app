const logger = require('./utils/logger.util')
const workerNotification = require('./workers/processesPaymentConfirmation')

workerNotification().catch((err) => {
  logger.error({ message: 'Worker Notification - ReceiveMessagesStreaming - Error occurred:', error: err })
  process.exit(1)
})

const express = require('express')
const app = express()
const port = process.env.PORT || '3000'

app.get('/', (req, res) => {
  res.send('Worker Notification')
})

app.listen(port, () => {
  console.log(`Ouvindo porta ${port}`)
})
