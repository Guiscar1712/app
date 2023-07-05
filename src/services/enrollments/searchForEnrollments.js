const { inscricoesPorCpf } = require('../../clients/ingresso/')
const { EnrollmentsDto } = require('../../dto/enrollment')
const Util = require('../../utils/util')

async function searchForEnrollments (document) {
  document = Util.formatCpf(document)

  const data = await inscricoesPorCpf(document)

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

  return enrollments
}

module.exports = searchForEnrollments
