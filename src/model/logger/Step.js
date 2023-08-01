const moment = require('moment')
const obscureSensitiveData = require('./../../extensions/obscureSensitiveData')
class Step {
  constructor () {
    this.entryDate = moment().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
  }

  finalize (data) {
    this.data = obscureSensitiveData(data)
    const endDate = moment()
    this.duration = moment.duration(endDate.diff(this.entryDate)).asMilliseconds()
  }
}

module.exports = Step
