const {
  consultaProvaOnline,
  consultaProvaOnlinePorBusinesskey,
} = require('../../clients/ingresso/')
const retry = require('../../utils/retry')
const { EnrollmentsDto, AdmissionsTest } = require('../../dto/enrollment')
const { ClientServerError } = require('../../utils/errors')

module.exports = class EnrollmentDetails {
  constructor({
    LoggerService,
    PaymentService,
    ContractListService,
    IngressoClient,
  }) {
    this.LoggerService = LoggerService
    this.PaymentService = PaymentService
    this.ContractListService = ContractListService
    this.IngressoClient = IngressoClient
  }

  get = async (idOrigin) => {
    const data = await retry(this.IngressoClient.inscricaoPorIdOrigin, idOrigin)

    const enrollmentsDto = new EnrollmentsDto(data)

    if (
      !enrollmentsDto ||
      !enrollmentsDto.businessKey ||
      enrollmentsDto.status === 'ERROR'
    ) {
      throw new ClientServerError('Unexpected Content', {
        method: 'EnrollmentsDto',
        data,
      })
    }

    if (!enrollmentsDto.enem.active) {
      await getAdmissionsTest(enrollmentsDto, data)
    }

    await this.getPaymentStatus(idOrigin, enrollmentsDto)

    if (enrollmentsDto.contract.available) {
      const queryFetch = {
        system: data.sistema,
        enrollmentId: enrollmentsDto.studentEnrollment.enrollmentId,
        businessKey: enrollmentsDto.businessKey,
      }

      const contracts =
        await this.ContractListService.fetchContracts(queryFetch)
      enrollmentsDto.contract.available = contracts.length >= 1
    }

    return enrollmentsDto
  }

  async getPaymentStatus(idOrigin, enrollmentsDto) {
    const status = await this.PaymentService.paymentStatus(idOrigin)

    if (status) {
      const paymentStatus = status.status === 'PAID' ?? false
      enrollmentsDto.studentEnrollment.payment = paymentStatus
    }
  }
}

async function getAdmissionsTest(enrollmentsDto, data) {
  let exam = await retry(
    consultaProvaOnlinePorBusinesskey,
    enrollmentsDto.businessKey
  )
  if (!exam) {
    throw new ClientServerError('Unexpected Content', {
      method: 'AdmissionsTest',
      errors: [data, enrollmentsDto, exam],
    })
  }

  if (exam.elegivelProvaOnline) {
    const data = await retry(consultaProvaOnline, enrollmentsDto.businessKey)
    exam = data?.prova
  }

  enrollmentsDto.admissionsTest = new AdmissionsTest(exam)

  if (
    !enrollmentsDto.admissionsTest ||
    enrollmentsDto.admissionsTest.status === 'ERROR'
  ) {
    throw new ClientServerError('Unexpected Content', {
      method: 'AdmissionsTest',
      errors: [data, enrollmentsDto, exam],
    })
  }
}
