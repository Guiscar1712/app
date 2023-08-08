const moment = require('moment')
const obscureSensitiveData = require('./../../extensions/obscureSensitiveData')
class Step {
  constructor () {
    this.entryDate = moment().format('YYYY-MM-DD HH:mm:ss.SSS')
  }

  Finalize (data) {
    if (data instanceof Error) {
      let { code, name, message, stack, errors } = data
      code = code ?? -1
      this.error = obscureSensitiveData({ code, name, message, stack, errors })
    } else {
      this.data = obscureSensitiveData(data)
    }

    const entryDate = moment(this.entryDate)
    const endDate = moment()
    this.duration = moment.duration(endDate.diff(entryDate)).asMilliseconds()
  }
}

module.exports = Step
