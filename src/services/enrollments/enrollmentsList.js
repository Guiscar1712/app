const moment = require('moment')
const retry = require('../../utils/retry')
const { EnrollmentsDto } = require('../../dto/enrollment')
const Util = require('../../utils/util')

module.exports = class EnrollmentList {
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

  get = async (document) => {
    const step = this.LoggerService.addStep('EnrollmentServiceList')
    try {
      document = Util.formatCpf(document)
      const data = await retry(this.IngressoClient.inscricoesPorCpf, document)

      if (!data || data.length === 0) {
        return []
      }

      const enrollments = []

      data.forEach((element) => {
        const enrollmentsDto = new EnrollmentsDto(element)
        if (enrollmentsDto.status !== 'ERROR') {
          delete enrollmentsDto.contract
          enrollments.push(enrollmentsDto)
        }
      })

      const enrollmentsSort = Util.sortNewest(enrollments, 'enrollmentDate')
      step.value.addData(enrollmentsSort)
      return enrollmentsSort
    } catch (error) {
      step.value.addData(error)
      throw error
    } finally {
      this.LoggerService.finalizeStep(step)
    }
  }
}
