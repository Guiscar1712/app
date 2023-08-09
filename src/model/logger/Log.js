const moment = require('moment')
// const Message = require('./Message')
const Content = require('./Content')
const processId = process.pid
class Log {
  constructor (data) {
    this.environment = process.env.NODE_ENV
    this.entryDate = moment().format('YYYY-MM-DD HH:mm:ss.SSS')
    this.host = data.host
    this.service = data.service
    this.thread = processId
    this.setLevelInfo()
  }

  Message (data) {
    this.content = new Content(data)
  }

  setLevelInfo () {
    this.level = 'INFO'
  }

  setLevelError () {
    this.level = 'ERROR'
  }

  finalize (data) {
    const entryDate = moment(this.entryDate)
    const endDate = moment()
    this.duration = moment.duration(endDate.diff(entryDate)).asMilliseconds()
  }
}

module.exports = Log
