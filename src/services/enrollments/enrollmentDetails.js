const { inscricaoPorIdOrigin, consultaProvaOnline } = require('../../clients/ingresso/')
const retry = require('../../utils/retry')
const { EnrollmentsDto, AdmissionsTest } = require('../../dto/enrollment')

async function enrollmentDetails (idOrigin) {
  const data = await retry(inscricaoPorIdOrigin, idOrigin)

  if (data?.inscricao === undefined) {
    return null
  }

  const enrollmentsDto = new EnrollmentsDto(data)

  if (enrollmentsDto.enem.active) {
    return enrollmentsDto
  }

  const exam = await retry(consultaProvaOnline, enrollmentsDto.businessKey)

  enrollmentsDto.admissionsTest = new AdmissionsTest(exam)

  return enrollmentsDto
}

module.exports = enrollmentDetails
