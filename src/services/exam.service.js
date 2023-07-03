const moment = require('moment')
const IngressoKrotonService = require('../services/ingressoKroton.service')
const instructionsRepository = require('../repositories/ExamInstructionsRepository')
const statusRepository = require('../repositories/ExamStatusRepository')
module.exports = class RegisterApp {
  static async eligible (subscriptionKey, UserId) {
    try {
      const token = await IngressoKrotonService.getToken()
      return await IngressoKrotonService.fetchExam(subscriptionKey, token.access_token)
    } catch (error) {
      throw new Error(error)
    }
  }

  static async eligibleToken (subscriptionKey, token) {
    try {
      if (!token) {
        token = await IngressoKrotonService.getToken()
      }

      return await IngressoKrotonService.fetchExam(subscriptionKey, token.access_token)
    } catch (error) {
      throw new Error(error)
    }
  }

  static async getInstructions () {
    return await instructionsRepository.filterBy({})
  }

  static async startExam (subscriptionKey) {
    try {
      const token = await IngressoKrotonService.getToken()
      return await IngressoKrotonService.startExam(subscriptionKey, token.access_token)
    } catch (error) {
      throw new Error(error)
    }
  }

  static async finalizeExam (subscriptionKey, model) {
    try {
      const token = await IngressoKrotonService.getToken()
      return await IngressoKrotonService.submitExam(subscriptionKey, model, token.access_token)
    } catch (error) {
      throw new Error(error)
    }
  }

  static async getEssayTheme (subscriptionKey) {
    const token = await IngressoKrotonService.getToken()
    const res = await IngressoKrotonService.startExam(subscriptionKey, token.access_token)
    return [res]
  }

  static async setStatus (model, UserId) {
    let status = await statusRepository.findInternalBy({ SubscriptionKey: model.subscription, UserId })

    const characters = model.text.length
    let startDate = null
    let endDate = null
    let duration = 0

    if (model.status === 'FINISHED') {
      startDate = moment(model.startDate, 'YYYY-MM-DD HH:mm:ss')
      endDate = moment(model.endDate, 'YYYY-MM-DD HH:mm:ss')
      duration = moment.duration(endDate.diff(startDate)).asMinutes()
    }

    if (status && status.Id && status.Attempts > model.attempts) {
      const res = { errors: [{ code: '40500', message: 'Valor de tentativas inválida!' }] }

      return res
    }

    status = status || {}
    status.SubscriptionKey = model.subscription
    status.Status = model.status
    status.StartDate = model.startDate
    status.EndDate = model.endDate
    status.Attempts = model.attempts
    status.Characters = characters
    status.Duration = duration
    status.ThemeId = model.themeId
    status.UserId = UserId

    if (status?.Id) {
      status.UpdatedAt = moment().format('YYYY-MM-DD HH:mm:ss.SSS')
      return await statusRepository.update(status.Id, status)
    }

    return await statusRepository.insert(status)
  }

  static async getStatus (subscriptionKey, UserId) {
    let status = await statusRepository.findBy({ SubscriptionKey: subscriptionKey, UserId })

    if (!status) {
      const token = await IngressoKrotonService.getToken()
      const res = await IngressoKrotonService.fetchExam(subscriptionKey, token.access_token)
      if (res.errors) {
        return res
      }

      status = status || {}
      status.SubscriptionKey = subscriptionKey
      status.Status = !res.finishedOnline && res.eligible ? 'UPDATE' : 'FINISHED'
      status.StartDate = res.startDate
      status.Attempts = res.numberAttempts
      status.UserId = UserId

      status = await statusRepository.insert(status)
    }

    return status
  }
}
