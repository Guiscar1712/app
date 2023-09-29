const moment = require('moment')
const { inscricoesPorCpf } = require('../../clients/ingresso/')
const { EnrollmentsDto } = require('../../dto/enrollment')
const retry = require('../../utils/retry')
const Util = require('../../utils/util')

async function searchForEnrollments(document) {
  document = Util.formatCpf(document)

  const data = await retry(inscricoesPorCpf, document)

  if (!data || data.length === 0) {
    return []
  }

  const enrollments = []

  data.forEach((element) => {
    if (!validateEnrollmentsDate(element)) {
      return
    }

    const enrollmentsDto = new EnrollmentsDto(element)
    if (enrollmentsDto.status !== 'ERROR') {
      delete enrollmentsDto.contract
      enrollments.push(enrollmentsDto)
    }
  })

  return enrollments
}

function validateEnrollmentsDate(element) {
  const dateNow = moment()
  const monthsAgo = parseInt(process.env.KROTON_INGRESSO_SEARCH_MONTHS_AGO)

  if (!element || !element.inscricao || !element.inscricao.dataInscricao) {
    return false
  }

  const enrollmentDate = moment(element.inscricao.dataInscricao)
  const diffInMonths = dateNow.diff(enrollmentDate, 'months')

  return !(diffInMonths > monthsAgo)
}

module.exports = searchForEnrollments
