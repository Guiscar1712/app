const retry = require('../../utils/retry')
const { ClientServerError } = require('../../utils/errors')
const { ContractDto } = require('../../dto/enrollment')
const { main } = require('../../clients/ingresso/contratoAceite')

module.exports = class ContractAcceptedService {
  constructor (LoggerService) {
    this.LoggerService = LoggerService
  }

  contractAccepted = async (contractId, clientIp) => {
    const body = { opcao: 1, ip: clientIp }
    const stepContractAccepted = this.LoggerService.addStep('ContractAcceptedServiceContractAccepted')

    try {
      const res = await retry(main, { contractId, body })
      if (!res || !res.dadosAceite) {
        const error = new ClientServerError('Something went wrong', [{ contractId, body }])
        stepContractAccepted.finalize({ contractId, body, error })
        throw error
      }
      const contract = new ContractDto(res)

      if (contract.status === 'ERROR') {
        const error = new ClientServerError('Something went wrong', [{ contractId, body }])
        stepContractAccepted.finalize({ contractId, body, error })
        throw error
      }

      stepContractAccepted.finalize({ contract })
      return contract
    } catch (error) {
      stepContractAccepted.finalize({ contractId, body, error })
      throw error
    }
  }
}
