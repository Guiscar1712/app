require('dotenv').config()
const logger = require('../../utils/logger.util.datadog')
const Log = require('../../model/logger/Log')
const Message = require('../../model/logger/Message')
const Step = require('../../model/logger/Step')

module.exports = class LoggerService {
  Start = (data) => {
    this.Log = new Log({ service: process.env.SERVICE_NAME, host: data.request.hostname })
    this.Log.content = new Message(data)
    return this.Log
  }

  AddStep = (name) => {
    const step = new Step()
    const index = String(Object.keys(this.Log.content.steps).length + 1).padStart(2, '0')
    const keyName = name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
    const key = `${index}-${keyName}`
    this.Log.content.AddStep(key, step)
    return this.Log.content.steps[key]
  }

  SetUserId (userId) {
    this.Log.content.SetUserIdIndex(userId)
  }

  SetResponse (data) {
    this.Log.content.AddResponse(data)
  }

  SetError = (step, error) => {
    this.Log.SetLevelERROR()
  }

  Finalize = () => {
    this.Log.Finalize()

    if (this.Log.level === 'INFO') {
      logger.info(this.Log)
      return
    }

    logger.error(this.Log)
  }
}
