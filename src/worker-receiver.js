const workerColaborar = require('./workers/receivePaymentConfirmationColaborar')
const workerOlimpo = require('./workers/receivePaymentConfirmationOlimpo')
const workerSap = require('./workers/receivePaymentConfirmationSap')

workerColaborar()
workerOlimpo()
workerSap()

const express = require('express')
const app = express()

const port = process.env.PORT || '3000'

app.get('/', (req, res) => {
  res.send('Worker receiver!')
})

app.listen(port, () => {
  console.log(`Ouvindo porta ${port}`)
})
