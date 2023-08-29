const { contratosPorMatricula, inscricaoPorIdOrigin, contratosPorBusinessKey } = require('../../clients/ingresso/')
const retry = require('../../utils/retry')
const { ContractDto, EnrollmentsDto } = require('../../dto/enrollment')

async function contractsList (idOrigin) {
  const enrollment = await retry(inscricaoPorIdOrigin, idOrigin)
  const enrollmentsDto = new EnrollmentsDto(enrollment)

  if (!enrollmentsDto || enrollmentsDto.status === 'ERROR') {
    throw new Error('Error ao processar ao consultar inscricão')
  }

  const queryFetch = {
    system: enrollment.sistema,
    enrollmentId: enrollmentsDto.studentEnrollment.enrollmentId,
    businessKey: enrollmentsDto.businessKey
  }

  return fetchContracts(queryFetch)
}

async function fetchContracts ({ system, enrollmentId, businessKey }) {
  let data

  if (system === 'COLABORAR') {
    if (!enrollmentId) {
      return []
    }
    data = await retry(contratosPorMatricula, enrollmentId)
  } else if (system === 'ATHENAS') {
    if (!businessKey) {
      return []
    }
    data = await retry(contratosPorBusinessKey, businessKey)
  }

  if (!data || data.length <= 0) {
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

  return contracts
}

module.exports = { contractsList, fetchContracts }
