const Validator = require('../validator')

module.exports = {
  ApplyValidate (model) {
    const contract = new Validator()
    contract.isRequired(model.subscription, '40100', 'Inscrição é obrigatório')
    contract.isRequired(model.themeId, '40102', 'Tema é obrigatório')
    contract.isRequired(model.theme, '40102', 'Tema é obrigatório')

    contract.isRequired(model.attempts, '40301', 'Quantidade Tentativa é obrigatório')
    contract.isRequired(model.startDate, '40306', 'Data de inocio é obrigatório')
    contract.hasMaxLen(model.startDate, model.EndDate, '40307', 'Data de inicio inválida')
    contract.isRequired(model.endDate, '40308', 'Data de fim é obrigatório')
    contract.hasMinLen(model.endDate, model.StartDate, '40309', 'Data de fim inválida')

    if (model.status === 'FINISHED') {
      contract.isRequired(model.title, '40103', 'Titulo é obrigatório, minimo de 5 caracteres')
      contract.hasMinLen(model.title, 5, '40103', 'Titulo é obrigatório')
      contract.hasMaxLen(model.title, 250, '40104', 'Titulo excedeu o limite máximo de 250')

      contract.isRequired(model.text, '40105', 'Redação é obrigatória, minimo de 450 caracteres')
      contract.hasMinLen(model.text, 450, '40105', 'Redação é obrigatória, minimo de 450 caracteres')
      contract.hasMaxLen(model.text, 5000, '40106', 'Redação excedeu o limite máximo de 5000')
    }

    return contract
  },

  ApplyUpdateValidate (model) {
    const contract = new Validator()
    contract.isRequired(model.subscription, '40100', 'Inscrição é obrigatório')
    contract.isRequired(model.themaId, '40102', 'Tema é obrigatório')

    contract.isRequired(model.title, '40103', 'Titulo é obrigatório, minimo de 5 caracteres')
    contract.hasMinLen(model.title, 5, '40103', 'Titulo é obrigatório')
    contract.hasMaxLen(model.title, 250, '40104', 'Titulo excedeu o limite máximo de 250')

    contract.isRequired(model.text, '40105', 'Redação é obrigatória, minimo de 450 caracteres')
    contract.hasMinLen(model.text, 450, '40105', 'Redação é obrigatória, minimo de 450 caracteres')
    contract.hasMaxLen(model.text, 5000, '40106', 'Redação excedeu o limite máximo de 5000')

    return contract
  },

  SubscriptionValidate (subscriptionKey) {
    const contract = new Validator()
    contract.isRequired(subscriptionKey, '40200', 'Inscrição é obrigatório')

    return contract
  },

  StatusValidate (model) {
    const contract = new Validator()
    contract.isRequired(model.subscriptionKey, '40300', 'Inscrição é obrigatório')
    contract.isRequired(model.Attempts, '40301', 'Quantidade Tentativa é obrigatório')
    contract.isRequired(model.characters, '40302', 'Quantidade de caracteres é obrigatório')
    contract.isRequired(model.Duration, '40303', 'Duração é obrigatório')
    contract.isRequired(model.themeId, '40304', 'Id do tema é obrigatório')
    contract.isRequired(model.theme, '40305', 'Descrição do tema é obrigatório')
    contract.isRequired(model.StartDate, '40306', 'Data de inocio é obrigatório')
    contract.hasMaxLen(model.StartDate, model.EndDate, '40307', 'Data de inicio inválida')
    contract.isRequired(model.EndDate, '40308', 'Data de fim é obrigatório')
    contract.hasMaxLen(model.EndDate, model.StartDate, '40309', 'Data de fim inválida')

    return contract
  }
}
