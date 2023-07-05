const { inscricaoPorIdOrigin } = require('../../clients/ingresso/')
const retry = require('../../utils/retry')
const { EnrollmentsDto } = require('../../dto/enrollment')
const ExamService = require('../exam.service')

async function enrollmentDetails (idOrigin) {
  const data = await retry(inscricaoPorIdOrigin, idOrigin)

  if (data?.inscricao === undefined) {
    return null
  }

  const enrollmentsDto = new EnrollmentsDto(data)

  if (enrollmentsDto.enem.active) {
    return enrollmentsDto
  }

  const exam = await ExamService.eligibleToken(enrollmentsDto.businessKey)
  enrollmentsDto.admissionsTest = exam

  return enrollmentsDto
}

module.exports = enrollmentDetails
