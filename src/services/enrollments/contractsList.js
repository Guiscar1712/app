const { contratosPorMatricula, inscricaoPorIdOrigin, contratosPorBusinessKey } = require('../../clients/ingresso/')
const retry = require('../../utils/retry')
const { ContractDto, EnrollmentsDto } = require('../../dto/enrollment')

async function contracts (idOrigin) {
  const enrollment = await retry(inscricaoPorIdOrigin, idOrigin)
  const enrollmentsDto = new EnrollmentsDto(enrollment)

  if (!enrollmentsDto || enrollmentsDto.status === 'ERROR') {
    throw new Error('Error ao processar ao consultar inscricão')
  }

  let data

  if (enrollment.sistema === 'COLABORAR') {
    const enrollmentId = enrollmentsDto.studentEnrollment.enrollmentId
    if (!enrollmentId) {
      return []
    }
    data = await retry(contratosPorMatricula, enrollmentId)
  } else if (enrollment.sistema === 'ATHENAS') {
    const businessKey = enrollmentsDto.businessKey
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

module.exports = contracts
