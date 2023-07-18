const { inscricaoPorIdOrigin, consultaProvaOnline, consultaProvaOnlinePorBusinesskey } = require('../../clients/ingresso/')
const retry = require('../../utils/retry')
const { EnrollmentsDto, AdmissionsTest } = require('../../dto/enrollment')
const { ClientServerError } = require('../../utils/errors')
const { paymentStatus } = require('./../payment')

async function enrollmentDetails (idOrigin) {
  const data = await retry(inscricaoPorIdOrigin, idOrigin)

  const enrollmentsDto = new EnrollmentsDto(data)

  if (!enrollmentsDto || !enrollmentsDto.businessKey || enrollmentsDto.status === 'ERROR') {
    throw new ClientServerError('Unexpected Content', { method: 'EnrollmentsDto', data })
  }

  if (!enrollmentsDto.enem.active) {
    await getAdmissionsTest(enrollmentsDto, data)
  }

  await getPaymentStatus(idOrigin, enrollmentsDto)

  return enrollmentsDto
}

async function getAdmissionsTest (enrollmentsDto, data) {
  // Verificar implementadação - no ambiente de homologção os dados do exame só ficaram disponives após executar essa chamada.
  const res = await retry(consultaProvaOnlinePorBusinesskey, enrollmentsDto.businessKey)
  if (!res) {
    throw new ClientServerError('Unexpected Content', { method: 'AdmissionsTest', errors: [data, enrollmentsDto, res] })
  }
  //

  const exam = await retry(consultaProvaOnline, enrollmentsDto.businessKey)
  enrollmentsDto.admissionsTest = new AdmissionsTest(exam)

  // Revisa tratamento de erro quando inscrição não tem dados de elegibiliade
  if (!enrollmentsDto.admissionsTest || enrollmentsDto.admissionsTest.status === 'ERROR') {
    throw new ClientServerError('Unexpected Content', { method: 'AdmissionsTest', errors: [data, enrollmentsDto, res, exam] })
  }
}

async function getPaymentStatus (idOrigin, enrollmentsDto) {
  const status = await paymentStatus(idOrigin)

  if (status) {
    const paymentStatus = status.status === 'PAID' ?? false
    enrollmentsDto.studentEnrollment.payment = paymentStatus
  }
}

module.exports = enrollmentDetails
