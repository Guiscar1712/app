const { inscricoesPorCpf } = require('../../clients/ingresso/')
const { EnrollmentsDto } = require('../../dto/enrollment')
const retry = require('../../utils/retry')
const Util = require('../../utils/util')

async function searchForEnrollments (document) {
  document = Util.formatCpf(document)

  const data = await retry(inscricoesPorCpf, document)

  if (!data || data.length === 0) {
    return []
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
