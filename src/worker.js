const workerColocaborar = require('./workers/receivePaymentConfirmationColaborar')
const workerOlimpo = require('./workers/receivePaymentConfirmationOlimpo')
const workerSap = require('./workers/receivePaymentConfirmationSap')

workerColocaborar()
workerOlimpo()
workerSap()
