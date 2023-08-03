const moment = require('moment')
const Message = require('./Message')
const processId = process.pid
class Log {
  constructor (data) {
    this.environment = process.env.NODE_ENV
    this.entryDate = moment().format('YYYY-MM-DD HH:mm:ss.SSS')
    this.host = data.host
    this.service = data.service
    this.thread = processId
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
    const entryDate = moment(this.entryDate)
    const endDate = moment()
    this.duration = moment.duration(endDate.diff(entryDate)).asMilliseconds()
  }
}

module.exports = Log
