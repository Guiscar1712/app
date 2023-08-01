const moment = require('moment')
const Message = require('./Message')
class Log {
  constructor (data) {
    this.entryDate = moment().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
    this.service = data.service
    this.thread = data.thread
  }

  message (data) {
    this.message = new Message(data)
  }

  setLevelINFO () {
    this.level = 'INFO'
  }

  setLevelERROR () {
    this.level = 'ERROR'
  }

  finalize (data) {
    const steps = Object.keys(this.message.steps)

    steps.forEach(element => {
      this.message.steps[element] = JSON.stringify(this.message.steps[element])
    })

    const endDate = moment()
    this.duration = moment.duration(endDate.diff(this.entryDate)).asMilliseconds()
  }
}

module.exports = Log
