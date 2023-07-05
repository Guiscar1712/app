const moment = require('moment')
class AdmissionsTest {
  constructor (data) {
    this.status = data.prova.provastatus
    this.maxAttempts = data.prova.quantidadeMaximaTentativas
    this.numberAttempts = data.prova.quantidadeTentativas
    this.startDate = data.prova.dataInicio
    this.endDate = data.prova.dataFim
    this.finishedOnline = data.prova.provaOnlineFinalizada

    this.setEligible(data.prova.elegivelProvaOnline)
    this.setDuration()
  }

  setEligible (eligibleProvaOnline) {
    if (this.finishedOnline) {
      this.eligible = 'DONE'
    } else if (this.maxAttempts === this.numberAttempts) {
      this.eligible = 'EXCEED_ATTEMPTS'
    } else if (eligibleProvaOnline) {
      this.eligible = 'ELIGIBLE'
    } else if (!eligibleProvaOnline) {
      this.eligible = 'NOT_ELIGIBLE'
    }
  }

  setDuration () {
    if (this.startDate && this.endDate) {
      const startDate = moment(this.startDate, 'YYYY-MM-DD HH:mm:ss')
      const endDate = moment(this.endDate, 'YYYY-MM-DD HH:mm:ss')
      const duration = Math.ceil(moment.duration(endDate.diff(startDate)).asMinutes())

      this.duration = duration
    }
  }
}

module.exports = AdmissionsTest
