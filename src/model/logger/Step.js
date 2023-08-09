const moment = require('moment')
const obscureSensitiveData = require('./../../extensions/obscureSensitiveData')
class Step {
  constructor () {
    this.date = moment().format('YYYY-MM-DD HH:mm:ss.SSS')
  }

  finalize (data) {
    if (data instanceof Error) {
      let { code, message, stack, errors, type } = data
      code = code ?? -1
      this.data = obscureSensitiveData({ code, message, stack, errors, type })
    } else {
      this.data = obscureSensitiveData(data)
    }

    const entryDate = moment(this.date)
    const endDate = moment()
    this.duration = moment.duration(endDate.diff(entryDate)).asMilliseconds()
  }
}

module.exports = Step
