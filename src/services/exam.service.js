const moment = require('moment')
const IngressoKrotonService = require('../services/ingressoKroton.service')
const instructionsRepository = require('../repositories/ExamInstructionsRepository')
const statusRepository = require('../repositories/ExamStatusRepository')
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

  static async getEssayTheme () {
    return [
      {
        id: 1534,
        description: 'A partir das suas experiências individuais, tanto profissionais quanto pessoais, redija um relato de experiência para a questão a seguir em norma-padrão escrita da língua portuguesa.Tema: O que você espera da sua carreira?'
      },
      {
        id: 1535,
        description: 'A partir das suas experiências individuais, tanto profissionais quanto pessoais, redija um relato de experiência para a questão a seguir em norma-padrão escrita da língua portuguesa.Tema: O que você espera da sua faculdade?'
      }
    ]
  }

  static async getInstructions () {
    return await instructionsRepository.filterBy({})
  }

  static async setStatus (model, UserId) {
    const status = await statusRepository.findInternalBy({ SubscriptionKey: model.subscription, UserId })

    const characters = model.text.length
    const startDate = moment(model.startDate, 'YYYY-MM-DD HH:mm:ss')
    const endDate = moment(model.endDate, 'YYYY-MM-DD HH:mm:ss')
    const duration = moment.duration(endDate.diff(startDate)).asMinutes()

    if (status && status.Id && status.Attempts > model.attempts) {
      const res = { errors: [{ code: '40500', message: 'Valor de tentativas inválida!' }] }

      return res
    }

    status.SubscriptionKey = model.subscription
    status.Status = model.status
    status.StartDate = model.startDate
    status.EndDate = model.endDate
    status.Attempts = model.attempts
    status.Characters = characters
    status.Duration = duration
    status.ThemeId = model.themeId
    status.Theme = model.theme
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
