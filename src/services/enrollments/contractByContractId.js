const retry = require('../../utils/retry')
const { ClientServerError } = require('../../utils/errors')
const { contratoPorId } = require('./../../clients/ingresso/')

async function enrollmentDetails (contractId) {
  const res = await retry(contratoPorId, contractId)

  if (!res || !res.arquivo) {
    throw new ClientServerError('Não foi possivel obter o contrato', [{ contractId }])
  }

  const data = {
    contract: res.arquivo
  }

  return data
}

module.exports = enrollmentDetails
