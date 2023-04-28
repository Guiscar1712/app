const Validator = require('../validator')

module.exports = {
  ApplyValidate (model) {
    const contract = new Validator()
    contract.isRequired(model.subscription, '40100', 'subscription é obrigatório')
    contract.isRequired(model.themeId, '40102', 'themeId é obrigatório')

    contract.isRequired(model.attempts, '40301', 'attempts Tentativa é obrigatório')

    if (model.status === 'FINISHED') {
      contract.isRequired(model.title, '40103', 'title é obrigatório, minimo de 5 caracteres')
      contract.hasMinLen(model.title, 5, '40103', 'title é obrigatório')
      contract.hasMaxLen(model.title, 250, '40104', 'title excedeu o limite máximo de 250')

      contract.isRequired(model.text, '40105', 'text é obrigatória, minimo de 450 caracteres')
      contract.hasMinLen(model.text, 450, '40105', 'text é obrigatória, minimo de 450 caracteres')
      contract.hasMaxLen(model.text, 5000, '40106', 'text excedeu o limite máximo de 5000')

      contract.isRequired(model.startDate, '40306', 'startDateé obrigatório')
      contract.hasMaxLen(model.startDate, model.EndDate, '40307', 'startDate inválida')

      contract.isRequired(model.endDate, '40308', 'endDate é obrigatório')
      contract.hasMinLen(model.endDate, model.StartDate, '40309', 'endDate inválida')
    }

    return contract
  },

  ApplyUpdateValidate (model) {
    const contract = new Validator()
    contract.isRequired(model.subscription, '40100', 'subscription é obrigatório')
    contract.isRequired(model.themeId, '40102', 'themeId é obrigatório')

    contract.isRequired(model.title, '40103', 'title é obrigatório, minimo de 5 caracteres')
    contract.hasMinLen(model.title, 5, '40103', 'title é obrigatório')
    contract.hasMaxLen(model.title, 250, '40104', 'title excedeu o limite máximo de 250')

    contract.isRequired(model.text, '40105', 'text é obrigatória, minimo de 450 caracteres')
    contract.hasMinLen(model.text, 450, '40105', 'text é obrigatória, minimo de 450 caracteres')
    contract.hasMaxLen(model.text, 5000, '40106', 'text excedeu o limite máximo de 5000')

    return contract
  },

  SubscriptionValidate (subscriptionKey) {
    const contract = new Validator()
    contract.isRequired(subscriptionKey, '40200', 'subscriptionKey é obrigatório')

    return contract
  },

  StatusValidate (model) {
    const contract = new Validator()
    contract.isRequired(model.subscriptionKey, '40300', 'subscriptionKey é obrigatório')
    contract.isRequired(model.Attempts, '40301', 'Attempts é obrigatório')
    contract.isRequired(model.characters, '40302', 'characters é obrigatório')
    contract.isRequired(model.Duration, '40303', 'Duration é obrigatório')
    contract.isRequired(model.themeId, '40304', 'themeId é obrigatório')
    contract.isRequired(model.StartDate, '40306', 'StartDate é obrigatório')
    contract.hasMaxLen(model.StartDate, model.EndDate, '40307', 'StartDate inválida')
    contract.isRequired(model.EndDate, '40308', 'EndDate é obrigatório')
    contract.hasMaxLen(model.EndDate, model.StartDate, '40309', 'EndDate inválida')

    return contract
  }
}
