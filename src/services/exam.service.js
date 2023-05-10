const moment = require('moment')
const IngressoKrotonService = require('../services/ingressoKroton.service')
const instructionsRepository = require('../repositories/ExamInstructionsRepository')
const statusRepository = require('../repositories/ExamStatusRepository')
const themeRepository = require('../repositories/ExamThemeRepository')
module.exports = class RegisterApp {
  static async apply (model, UserId) {
    try {
      const dataStatus = await this.setStatus(model, UserId)

      return dataStatus
    } catch (error) {
      throw new Error(error)
    }
  }

  static async eligible (subscriptionKey, UserId) {
    try {
      const token = await IngressoKrotonService.getToken()
      const res = await IngressoKrotonService.eligibleExam(subscriptionKey, token.access_token)
      if (res.errors) {
        return res
      }

      if (res.provaOnlineFinalizada) {
        return 'DONE'
      } else if (res.elegivelProvaOnline) {
        return 'ELIGIBLE'
      } else if (!res.elegivelProvaOnline) {
        return 'NOT_ELIGIBLE'
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  static async getEssayTheme (isActive = true) {
    return await themeRepository.filterBy({ IsActive: isActive })
  }

  static async getInstructions () {
    return await instructionsRepository.filterBy({})
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
    return await statusRepository.findBy({ SubscriptionKey: subscriptionKey, UserId })
  }
}
