require('dotenv').config()
const logger = require('../../utils/logger.util.datadog')
const Log = require('../../model/logger/Log')
const Content = require('../../model/logger/Content')
const Step = require('../../model/logger/Step')
const Util = require('../../utils/util')

module.exports = class LoggerService {
  newLog = (indexs, type, request) => {
    this.Log = new Log({ service: process.env.SERVICE_NAME, host: request.hostname })
    this.Log.content = new Content(indexs, type, request)
    return this.Log
  }

  addStep = (name) => {
    const step = new Step()
    const index = String(Object.keys(this.Log.content.steps).length + 1).padStart(2, '0')

    const keyName = Util.createSlug(name)

    const key = `${index}-${keyName}`
    this.Log.content.addStep(key, step)
    return this.Log.content.steps[key]
  }

  setUserId (userId) {
    this.Log.content.setUserIdIndex(userId)
  }

  setIndex (data) {
    this.Log.content.setIndex(data)
  }

  setResponse (data) {
    this.Log.content.addResponse(data)
  }

  setError = (error) => {
    const name = error.type || error.name
    const stepError = this.addStep(name)
    stepError.finalize(error)
    if (!error.level || error.level === 'ERROR') {
      this.Log.setLevelError()
      return
    }
    if (error?.level === 'WARN') {
      this.Log.setLevelWarn()
    }
  }

  finalize = () => {
    this.Log.finalize()

    if (this.Log.level === 'INFO') {
      logger.info(this.Log)
      return
    }
    if (this.Log.level === 'WARN') {
      logger.warn(this.Log)
      return
    }

    logger.error(this.Log)
  }
}
