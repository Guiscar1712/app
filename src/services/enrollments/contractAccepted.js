const retry = require('../../utils/retry')
const { ClientServerError } = require('../../utils/errors')
const { ContractDto } = require('../../dto/enrollment')

module.exports = class ContractAcceptedService {
  constructor({ IngressoClient, LoggerService }) {
    this.LoggerService = LoggerService
    this.IngressoClient = IngressoClient
  }

  contractAccepted = async (contractId, clientIp) => {
    const body = { opcao: 1, ip: clientIp }
    const step = this.LoggerService.addStep(
      'ContractAcceptedServiceContractAccepted'
    )

    try {
      const res = await retry(this.IngressoClient.contratoAceite, {
        contractId,
        body,
      })
      if (!res || !res.dadosAceite) {
        const error = new ClientServerError('Something went wrong', [
          { contractId, body },
        ])
        throw error
      }
      const contract = new ContractDto(res)

      if (contract.status === 'ERROR') {
        const error = new ClientServerError('Something went wrong', [
          { contractId, body },
        ])
        throw error
      }

      step.value.addData({ contract })
      this.LoggerService.finalizeStep(step)
      return contract
    } catch (error) {
      throw error
    }
  }
}
