const { inscricaoPorIdOrigin } = require('../../clients/ingresso/')
const { EnrollmentsDto } = require('../../dto/enrollment')
const Util = require('../../utils/util')
const ExamService = require('../exam.service')

async function enrollmentDetals (document) {
  document = Util.formatCpf(document)

  const data = await inscricaoPorIdOrigin(document)

  if (data?.inscricao === undefined) {
    return null
  }

  const enrollmentsDto = new EnrollmentsDto(data)
  const exam = await ExamService.eligibleToken(enrollmentsDto.businessKey)

  enrollmentsDto.admissionsTest = exam

  return enrollmentsDto
}

module.exports = enrollmentDetals
