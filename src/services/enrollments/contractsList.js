const { contratosPorMatricula, inscricaoPorIdOrigin, contratosPorBusinessKey } = require('../../clients/ingresso/')
const retry = require('../../utils/retry')
const { ContractDto, EnrollmentsDto } = require('../../dto/enrollment')

class ContractsService {
  constructor ({ LoggerService }) {
    this.LoggerService = LoggerService
  }

  async contracts (idOrigin) {
    const stepContractList = this.LoggerService.addStep('ContractListServiceContracts')
    const enrollment = await retry(inscricaoPorIdOrigin, idOrigin)
    const enrollmentsDto = new EnrollmentsDto(enrollment)

    if (!enrollmentsDto || enrollmentsDto.status === 'ERROR') {
      stepContractList.finalize({ errorGetContractsServiceContracts: enrollmentsDto })
      throw new Error('Error ao processar ao consultar inscricão')
    }

    let data

    if (enrollment.sistema === 'COLABORAR') {
      const enrollmentId = enrollmentsDto.studentEnrollment.enrollmentId
      if (!enrollmentId) {
        stepContractList.finalize({ COLABORAR: enrollmentId })
        return []
      }
      data = await retry(contratosPorMatricula, enrollmentId)
    } else if (enrollment.sistema === 'ATHENAS') {
      const businessKey = enrollmentsDto.businessKey
      if (!businessKey) {
        stepContractList.finalize({ ATHENAS: businessKey })
        return []
      }
      data = await retry(contratosPorBusinessKey, businessKey)
    }

    if (!data || data.length <= 0) {
      stepContractList.finalize({ data: 'Lista vazia' })
      return []
    }

    const contracts = []
    data.forEach(element => {
      const contract = new ContractDto(element)
      if (contract.status === 'ERROR') {
        return
      }
      contracts.push(contract)
    })

    stepContractList.finalize({ data })
    return contracts
  }
}

module.exports = ContractsService
