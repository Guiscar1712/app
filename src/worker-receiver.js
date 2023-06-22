const workerColaborar = require('./workers/receivePaymentConfirmationColaborar')
const workerOlimpo = require('./workers/receivePaymentConfirmationOlimpo')
const workerSap = require('./workers/receivePaymentConfirmationSap')

workerColaborar()
workerOlimpo()
workerSap()
