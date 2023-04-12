const Validator = require('../validator')

module.exports = {
  ApplyValidateApply (model) {
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
  }
}
