const IngressoKrotonService = require('../services/ingressoKroton.service')

module.exports = class SubscriptionController {
  static async get (request, response, next) {
    try {
      let cpf = request.params.cpf

      cpf = formatCpf(cpf)

      const token = await IngressoKrotonService.getToken()
      const subscription = await IngressoKrotonService.getSubscription(
        cpf,
        token.access_token
      )
      response.json(subscription)
    } catch (error) {
      if (error.response) {
        console.log(error.response.data)
        next(error.response.data)
      } else {
        console.log(error)
        next(error)
      }
      // response.status(400).json({ success: false })
    }

    function formatCpf (cpf) {
      const cnpjCpf = cpf.replace(/\D/g, '')

      if (cnpjCpf.length === 11) {
        return cnpjCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '\$1.\$2.\$3-\$4')
      }

      throw new Error('CPF inválido!')
    }
  }

  static async post (request, response, next) {
    try {
      const token = await IngressoKrotonService.getToken()
      const subscription = await IngressoKrotonService.createSubscription(
        request.body,
        token.access_token
      )
      response.json(subscription)
    } catch (error) {
      if (error.response) {
        console.log(error.response.data)
        response.status(401).json(error.response.data)
        // next(error.response.data)
      } else {
        console.log(error)
        next(error)
      }
    }
  }
}
