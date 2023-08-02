const moment = require('moment')
const Message = require('./Message')
class Log {
  constructor (data) {
    this.entryDate = moment().format('YYYY-MM-DDTHH:mm:ss.SSS[Z]')
    this.service = data.service
    this.thread = data.thread
    this.SetLevelINFO()
  }

  Message (data) {
    this.message = new Message(data)
  }

  SetLevelINFO () {
    this.level = 'INFO'
  }

  SetLevelERROR () {
    this.level = 'ERROR'
  }

  Finalize (data) {
    const endDate = moment()
    this.duration = moment.duration(endDate.diff(this.entryDate)).asMilliseconds()
  }
}

module.exports = Log
