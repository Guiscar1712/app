const IngressoKrotonService = require('../services/ingressoKroton.service')

module.exports = class TestController {
  static async run (request, response, next) {
    try {
      const token = await IngressoKrotonService.getToken()
      const inscricao = await IngressoKrotonService.getSubscription(
        '30525091874',
        token.access_token
      )
      response.json(inscricao)
    } catch (error) {
      if (error.response) {
        console.log(error.response.data.message)
      } else {
        console.log(error.message)
      }
      next(error)
      // response.status(400).json({ success: false })
    }
  }

  static async dowork (request, response, next) {
    response.json('dowork')
  }
}
