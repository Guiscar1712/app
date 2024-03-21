const moment = require('moment')
class AdmissionsTest {
  constructor(data) {
    if (!data) {
      this.status = 'ERROR'
      return
    }

    this.status = data.provastatus
    this.maxAttempts = data.quantidadeMaximaTentativas
    this.numberAttempts = data.quantidadeTentativas
    this.startDate = data.dataInicio
    this.endDate = data.dataFim
    this.finishedOnline = data.provaOnlineFinalizada

    this.setEligible(data.elegivelProvaOnline)
    this.setDuration()
  }

  setEligible(eligibleProvaOnline) {
    if (this.finishedOnline) {
      this.eligible = 'DONE'
    } else if (eligibleProvaOnline) {
      this.eligible = 'ELIGIBLE'
    } else if (!eligibleProvaOnline) {
      this.eligible = 'NOT_ELIGIBLE'
    } else if (this.maxAttempts === this.numberAttempts) {
      this.eligible = 'EXCEED_ATTEMPTS'
    }
  }

  setDuration() {
    if (this.startDate && this.endDate) {
      const startDate = moment(this.startDate, 'YYYY-MM-DD HH:mm:ss')
      const endDate = moment(this.endDate, 'YYYY-MM-DD HH:mm:ss')
      const duration = Math.ceil(
        moment.duration(endDate.diff(startDate)).asMinutes()
      )

      this.duration = duration
    }
  }
}

module.exports = AdmissionsTest
