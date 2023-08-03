const moment = require('moment')
const obscureSensitiveData = require('./../../extensions/obscureSensitiveData')
class Step {
  constructor () {
    this.entryDate = moment().format('YYYY-MM-DD HH:mm:ss.SSS')
  }

  finalize (data) {
    this.data = obscureSensitiveData(data)

    const entryDate = moment(this.entryDate)
    const endDate = moment()
    this.duration = moment.duration(endDate.diff(entryDate)).asMilliseconds()
  }
}

module.exports = Step
