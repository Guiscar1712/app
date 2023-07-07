const { inscricaoPorIdOrigin, consultaProvaOnline } = require('../../clients/ingresso/')
const retry = require('../../utils/retry')
const { EnrollmentsDto, AdmissionsTest } = require('../../dto/enrollment')
const { ClientServerError } = require('../../utils/errors')

async function enrollmentDetails (idOrigin) {
  const data = await retry(inscricaoPorIdOrigin, idOrigin)

  const enrollmentsDto = new EnrollmentsDto(data)

  if (enrollmentsDto.status === 'ERROR') {
    throw new ClientServerError('Unexpected Content', { method: 'EnrollmentsDto', data })
  }

  if (enrollmentsDto.enem.active) {
    return enrollmentsDto
  }

  if (!enrollmentsDto || !enrollmentsDto.businessKey) {
    return enrollmentsDto
  }

  const exam = await retry(consultaProvaOnline, enrollmentsDto.businessKey)

  enrollmentsDto.admissionsTest = new AdmissionsTest(exam)

  return enrollmentsDto
}

module.exports = enrollmentDetails
