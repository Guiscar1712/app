require('dotenv').config()
const logger = require('../../utils/logger.util.datadog')
const Log = require('../../model/logger/Log')
const Content = require('../../model/logger/Content')
const Step = require('../../model/logger/Step')
const Util = require('../../utils/util')

module.exports = class LoggerService {
  Log = {}
  constructor() {
    this.Log = {}
  }

  newLog = (indexs, type, request) => {
    this.Log = new Log({
      service: process.env.SERVICE_NAME,
      host: request.hostname,
    })
    this.Log.content = new Content(indexs, type, request)
    return this.Log
  }

  addStep = (name, data = null) => {
    if (data) {
      this.addStepTrace(name, data)
    }

    const step = new Step()
    const keyName = Util.createSlug(name)

    return { key: keyName, value: step }
  }

  addStepTrace = (name, data) => {
    const step = new Step()
    const key = this.getStepKey(name)
    step.value.addData(data)
    step.finalize()
    this.addStepContent(key, step)
    return step
  }

  finalizeStep = ({ key, value }) => {
    const keyName = this.getStepKey(key)
    this.addStepContent(keyName, value)
    value.finalize()
    return value
  }

  setError = (error) => {
    const name = error.functionError || error.type || error.name
    const stepError = this.addStep(name)
    stepError.value.addData(error)
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

  addStepContent(key, step) {
    this.Log.content.addStep(key, step)
  }

  getStepKey(name) {
    const index = String(
      Object.keys(this.Log.content.steps).length + 1
    ).padStart(2, '0')
    const keyName = Util.createSlug(name)
    const key = `${index}-${keyName}`
    return key
  }

  setUserId(userId) {
    this.Log.content.setUserIdIndex(userId)
  }

  setIndex(data) {
    this.Log.content.setIndex(data)
  }

  setResponse(data) {
    this.Log.content.addResponse(data)
  }
}
