const { inscricoes } = require('../../clients/ingresso/')
const { EnrollmentsDto } = require('../../dto/enrollment')
const Util = require('../../utils/util')
const ExamService = require('../exam.service')

const IngressoKrotonService = require('../ingressoKroton.service')

async function searchForEnrollments (document) {
  document = Util.formatCpf(document)

  const data = await inscricoes(document)

  if (!data || data.length === 0) {
    return null
  }

  const enrollments = []
  data.forEach(element => {
    const enrollmentsDto = new EnrollmentsDto(element)
    if (enrollmentsDto.status !== 'ERROR') {
      enrollments.push(enrollmentsDto)
    }
  })

  const token = await IngressoKrotonService.getToken()

  for (let index = 0; index < enrollments.length; index++) {
    const element = enrollments[index]

    if (!element.enem.active) {
      const exam = await ExamService.eligibleToken(element.businessKey, token)
      element.admissionsTest = exam
    }
  }

  return enrollments
}

module.exports = searchForEnrollments
