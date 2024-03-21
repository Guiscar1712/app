const moment = require('moment')
const retry = require('../../utils/retry')
const { CardDto } = require('../../dto/enrollment')
const Util = require('../../utils/util')

module.exports = class EnrollmentCards {
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
    const step = this.LoggerService.addStep('EnrollmentServiceGetCards')
    try {
      document = Util.formatCpf(document)
      const data = await retry(this.IngressoClient.inscricoesPorCpf, document)

      if (!data || data.length === 0) {
        return []
      }

      const cards = []

      data.forEach((element) => {
        if (!validateEnrollmentsDate(element)) {
          return
        }

        const cardDto = new CardDto(element)
        if (cardDto.status !== 'ERROR') {
          cards.push(cardDto)
        }
      })

      step.value.addData(cards)
      return cards
    } catch (error) {
      step.value.addData(error)
      throw error
    } finally {
      this.LoggerService.finalizeStep(step)
    }
  }
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
