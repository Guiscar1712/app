const examEnum = require('../enum/Exam')
const IngressoKrotonService = require('../services/ingressoKroton.service')

module.exports = class RegisterApp {
  static async apply (model, UserId) {
    try {
      return model
    } catch (error) {
      throw new Error(error)
    }
  }

  static async eligible (subscription, UserId) {
    try {
      const token = await IngressoKrotonService.getToken()
      const res = await IngressoKrotonService.eligibleExam(subscription, token.access_token)
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
}
