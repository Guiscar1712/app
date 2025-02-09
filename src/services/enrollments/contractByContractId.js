const retry = require('../../utils/retry')
const { ClientServerError } = require('../../utils/errors')
const ContratoPorId = require('./../../clients/ingresso/contratoPorContratoId')

module.exports = class EnrollmentDetailsService {
  constructor({ IngressoClient, LoggerService }) {
    this.LoggerService = LoggerService
    this.IngressoClient = IngressoClient
  }

  async enrollmentDetails(contractId) {
    const step = this.LoggerService.addStep(
      'EnrollmentDetailsServiceEnrollmentDetails'
    )

    try {
      const contratoPorId = new ContratoPorId({
        LoggerService: this.LoggerService,
      })
      const res = await retry(contratoPorId.request, contractId)

      if (!res || !res.arquivo) {
        const error = new ClientServerError(
          'Não foi possível obter o contrato',
          [{ contractId }]
        )
        step.value.addData({ contractId, error })
        throw error
      }

      const data = {
        contract: res.arquivo,
      }

      step.value.addData({ contractId, data })
      return data
    } catch (error) {
      step.value.addData({ contractId, error })
      throw error
    } finally {
      this.LoggerService.finalizeStep(step)
    }
  }
}
