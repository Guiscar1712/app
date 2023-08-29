const retry = require('../../utils/retry')
const { ClientServerError } = require('../../utils/errors')
const { contratoPorId } = require('./../../clients/ingresso/')

module.exports = class EnrollmentDetailsService {
  constructor ({ LoggerService }) {
    this.LoggerService = LoggerService
  }

  async enrollmentDetails (contractId) {
    const stepEnrollmentDetails = this.LoggerService.addStep('EnrollmentDetailsServiceEnrollmentDetails')

    try {
      const res = await retry(contratoPorId, contractId)

      if (!res || !res.arquivo) {
        const error = new ClientServerError('Não foi possível obter o contrato', [{ contractId }])
        stepEnrollmentDetails.finalize({ contractId, error })
        throw error
      }

      const data = {
        contract: res.arquivo
      }

      stepEnrollmentDetails.finalize({ contractId, data })
      return data
    } catch (error) {
      stepEnrollmentDetails.finalize({ contractId, error })
      throw error
    }
  }
}
