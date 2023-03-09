const axios = require('axios').create({ timeout: 1000000 })
const config = require('../utils/config')
const { getSubscriptionDto } = require('../dto/subscription')

module.exports = class IngressoKrotonService {
  static async getToken () {
    const body = new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: config.kroton.ingresso.client_id,
      client_secret: config.kroton.ingresso.client_secret
    })

    return (
      await axios.post(config.kroton.ingresso.url + '/oauth2/token', body, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
    ).data
  }

  static async getSubscription (cpf, token) {
    const res =
      await axios.get(
        'https://ingresso-api.kroton.com.br/ms/inscricaocqrs/captacao/v5/inscricao/cpf/' +
        cpf,
        {
          headers: {
            'Ocp-Apim-Subscription-Key':
              config.kroton.ingresso.OcpApimSubscriptionKey,
            Authorization: token
          }
        }
      )

    if (res.status === 200) {
      return getSubscriptionDto(res.data)
    }

    throw new Error('Ops!')
  }

  static async createSubscription (body, token) {
    return (
      await axios.post(
        'https://ingresso-api.kroton.com.br/ms/inscricaocqrs/captacao/v5/inscricao',
        body,
        {
          headers: {
            'Ocp-Apim-Subscription-Key':
              config.kroton.ingresso.OcpApimSubscriptionKey,
            Authorization: token
          }
        }
      )
    ).data
  }
}
