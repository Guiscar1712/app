const { inscricaoPorIdOrigin, consultaProvaOnline, consultaProvaOnlinePorBusinesskey } = require('../../clients/ingresso/')
const retry = require('../../utils/retry')
const { EnrollmentsDto, AdmissionsTest } = require('../../dto/enrollment')
const { ClientServerError } = require('../../utils/errors')
const { fetchContracts } = require('./contractsList')

module.exports = class EnrollmentDetails {
  constructor ({ LoggerService, PaymentService }) {
    this.LoggerService = LoggerService
    this.PaymentService = PaymentService
  }

  get = async (idOrigin) => {
    const data = await retry(inscricaoPorIdOrigin, idOrigin)

    const enrollmentsDto = new EnrollmentsDto(data)

    if (!enrollmentsDto || !enrollmentsDto.businessKey || enrollmentsDto.status === 'ERROR') {
      throw new ClientServerError('Unexpected Content', { method: 'EnrollmentsDto', data })
    }

    if (!enrollmentsDto.enem.active) {
      await getAdmissionsTest(enrollmentsDto, data)
    }

    await this.getPaymentStatus(idOrigin, enrollmentsDto)

    if (enrollmentsDto.contract.available) {
      const queryFetch = {
        system: data.sistema,
        enrollmentId: enrollmentsDto.studentEnrollment.enrollmentId,
        businessKey: enrollmentsDto.businessKey
      }

      const contracts = await fetchContracts(queryFetch)
      enrollmentsDto.contract.available = contracts.length > 1
    }

    return enrollmentsDto
  }

  async getPaymentStatus (idOrigin, enrollmentsDto) {
    const status = await this.PaymentService.paymentStatus(idOrigin)

    if (status) {
      const paymentStatus = status.status === 'PAID' ?? false
      enrollmentsDto.studentEnrollment.payment = paymentStatus
    }
  }
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
