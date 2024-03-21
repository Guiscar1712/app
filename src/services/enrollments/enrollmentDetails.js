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
    const step = this.LoggerService.addStep('EnrollmentServiceDetails')

    try {
      const data = await retry(
        this.IngressoClient.inscricaoPorIdOrigin,
        idOrigin
      )

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

      await getAdmissionsTest(enrollmentsDto, data)

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
    } catch (error) {
      step.value.addData(error)
      throw error
    } finally {
      this.LoggerService.finalizeStep(step)
    }
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
  if (
    enrollmentsDto.enem.active ||
    data.inscricao.classificacao.descricao == 'ALUNO' ||
    data.inscricao.classificacao.descricao == 'CONVOCADO' ||
    data.inscricao.tipoIngresso == 'ISENTO_VESTIBULAR'
  ) {
    enrollmentsDto.admissionsTest = new AdmissionsTest({
      provaOnlineFinalizada: true,
    })
    return enrollmentsDto
  }

  let exam = await retry(
    consultaProvaOnlinePorBusinesskey,
    enrollmentsDto.businessKey
  )

  if (!exam) {
    throw new ClientServerError('getAdmissionsTest Unexpected Content', {
      method: 'consultaProvaOnlinePorBusinesskey',
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
    throw new ClientServerError('getAdmissionsTest Unexpected Content', {
      method: 'consultaProvaOnline',
      errors: [data, enrollmentsDto, exam],
    })
  }
}
