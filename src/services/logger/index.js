require('dotenv').config()
const logger = require('../../utils/logger.util')
const Log = require('../../model/logger/Log')
const Message = require('../../model/logger/Message')
const Step = require('../../model/logger/Step')

module.exports = class LoggerService {
  Start = (data) => {
    const threadId = Math.floor(10000 + Math.random() * 90000)
    this.Log = new Log({ service: process.env.SERVICE_NAME, thread: threadId })
    this.Log.message = new Message(data)
    return this.Log
  }

  AddStep = (name) => {
    const step = new Step()
    const index = String(Object.keys(this.Log.message.steps).length + 1).padStart(2, '0')
    const keyName = name.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
    const key = `${index}-${keyName}`
    this.Log.message.AddStep(key, step)
    return this.Log.message.steps[key]
  }

  SetResponse (data) {
    this.Log.message.AddResponse(data)
  }

  SetError = (step, error) => {
    this.Log.SetLevelERROR()
  }

  finalize = () => {
    this.Log.Finalize()

    if (this.Log.level === 'INFO') {
      logger.info(this.Log)
      return
    }

    logger.error(this.Log)
  }
}
