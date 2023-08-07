const moment = require('moment')
const IngressoKrotonService = require('../services/ingressoKroton.service')
const instructionsRepository = require('../repositories/ExamInstructionsRepository')
const statusRepository = require('../repositories/ExamStatusRepository')
module.exports = class RegisterApp {
  static async eligible (subscriptionKey) {
    try {
      // Validar essa implementação
      // Foi necessario implementar a chamada do endpoint de elebilidade
      // ms/inscricao/v4/captacao/prova-online/businesskey/ antes de realizar a outra consulta mais detalhada
      await IngressoKrotonService.eligibleExam(subscriptionKey)
      return await IngressoKrotonService.fetchExam(subscriptionKey)
    } catch (error) {
      throw new Error(error)
    }
  }

  static async eligibleToken (subscriptionKey) {
    try {
      return await IngressoKrotonService.fetchExam(subscriptionKey)
    } catch (error) {
      throw new Error(error)
    }
  }

  static async getInstructions () {
    return await instructionsRepository.filterBy({})
  }

  static async startExam (subscriptionKey) {
    try {
      return await IngressoKrotonService.startExam(subscriptionKey)
    } catch (error) {
      throw new Error(error)
    }
  }

  static async finalizeExam (subscriptionKey, model) {
    try {
      return await IngressoKrotonService.submitExam(subscriptionKey, model)
    } catch (error) {
      throw new Error(error)
    }
  }

  static async getEssayTheme (subscriptionKey) {
    const res = await IngressoKrotonService.startExam(subscriptionKey)
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
      const res = await IngressoKrotonService.fetchExam(subscriptionKey)
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
