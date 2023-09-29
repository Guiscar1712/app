const {
  contratosPorMatricula,
  contratosPorBusinessKey,
} = require('../../clients/ingresso/')
const retry = require('../../utils/retry')
const { ContractDto, EnrollmentsDto } = require('../../dto/enrollment')
const BaseError = require('../../utils/errors/BaseError')
const { ServerError } = require('../../utils/errors')

class ContractsService {
  constructor({ IngressoClient, LoggerService }) {
    this.LoggerService = LoggerService
    this.IngressoClient = IngressoClient
  }

  async contracts(idOrigin) {

    const enrollment = await retry(
      this.IngressoClient.inscricaoPorIdOrigin,
      idOrigin
    )

    const enrollmentsDto = new EnrollmentsDto(enrollment)

    if (!enrollmentsDto || enrollmentsDto.status === 'ERROR') {
      throw new Error('Error ao processar ao consultar inscricão')
    }

    const queryFetch = {
      system: enrollment.sistema,
      enrollmentId: enrollmentsDto.studentEnrollment.enrollmentId,
      businessKey: enrollmentsDto.businessKey,
    }
    
    return await this.fetchContracts(queryFetch)
  }

  async fetchContracts({ system, enrollmentId, businessKey }) {
    const step = this.LoggerService.addStepStepTrace('ServicesEnrollmentsContractListFetchContracts')

    try {
      let data

      if (system === 'COLABORAR' && enrollmentId) {
        data = await retry(contratosPorMatricula, enrollmentId)
      } else if (system === 'ATHENAS' && businessKey) {
        data = await retry(contratosPorBusinessKey, businessKey)
      }

      if (!data || data.length <= 0) {
        return []
      }

      const contracts = []
      data.forEach((element) => {
        const contract = new ContractDto(element)
        if (contract.status === 'ERROR') {
          return
        }
        contracts.push(contract)
      })

      this.LoggerService.finalizeStep(step.value, step.key, {contracts})
      return contracts
    } catch (error) {
      if (error instanceof BaseError) {
        step.finalize({ system, enrollmentId, businessKey, error })
        throw error
      }
      const errorData = new ServerError('Error consulting contracts.', error)
      step.finalize({ system, enrollmentId, businessKey, error: errorData })
      throw errorData
    }
  }
}

module.exports = ContractsService
