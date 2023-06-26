const workerNotification = require('./workers/processesPaymentConfirmation')

workerNotification()

const express = require('express')
const app = express()
const port = process.env.PORT || '3000'

app.get('/', (req, res) => {
  res.send('Worker Notification')
})

app.listen(port, () => {
  console.log(`Ouvindo porta ${port}`)
})
