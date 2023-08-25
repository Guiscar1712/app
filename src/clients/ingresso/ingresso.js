const axios = require('axios').create({ timeout: 1000000 })
const config = require('../../utils/config')
const ClientServerAuthError = require('../../utils/errors/ClientServerAuthError')
const ClientServerError = require('../../utils/errors/ClientServerError')
const getToken = require('./token')

const ingresso = {
  grant_type: 'client_credentials',
  client_id: config.kroton.ingresso.client_id,
  client_secret: config.kroton.ingresso.client_secret,
  base_uri: config.kroton.ingresso.url,
  OcpApimSubscriptionKey: config.kroton.ingresso.OcpApimSubscriptionKey
}

const urlBase = ingresso.base_uri

module.exports = class Ingresso {
  constructor ({ LoggerService, IngressoGetDadosPagamento }) {
    this.LoggerService = LoggerService
    this.IngressoGetDadosPagamento = IngressoGetDadosPagamento
  }

  getPersonalData = async (cpf) => {
    const step = this.LoggerService.addStep('IngressoClientGetPersonalData')
    const url = `${urlBase}/ms/dadospessoais/captacao/v1/dadospessoais/${cpf}`
    try {
      const token = await getToken()
      const res = await axios.get(
        url,
        {
          headers: {
            'Ocp-Apim-Subscription-Key': ingresso.OcpApimSubscriptionKey,
            Authorization: 'Bearer ' + token
          }
        }
      ).catch(function (error) {
        return error.response
      })

      step.finalize({ status: res.status, data: res.data, headers: res.config.headers, method: res.config.method, url })
      if (res.status === 200) {
        return res.data
      }

      throw res
    } catch (error) {
      let errorData
      if (error.status === 401) {
        errorData = new ClientServerAuthError('Not authorized', { client: url, errors: error.data })
      } else {
        errorData = new ClientServerError('Something went wrong', { client: url, errors: error.data })
      }
      step.finalize({ cpf, url, errorData })
      throw errorData
    }
  }

  updatePersonalData = async (body) => {
    const step = this.LoggerService.addStep('IngressoClientUpdatePersonalData')
    const url = `${urlBase}/ms/dadospessoais/captacao/v1/dadospessoais`
    try {
      const token = await getToken()
      const res = await axios.post(
        url,
        body,
        {
          headers: {
            'Ocp-Apim-Subscription-Key': ingresso.OcpApimSubscriptionKey,
            Authorization: 'Bearer ' + token
          }
        }
      ).catch(function (error) {
        return error.response
      })

      step.finalize({ status: res.status, data: res.data, headers: res.config.headers, method: res.config.method, url })
      if (res.status === 200) {
        return res.data
      }

      throw res
    } catch (error) {
      let errorData
      if (error.status === 401) {
        errorData = new ClientServerAuthError('Not authorized', { client: url, errors: error.data })
      } else {
        errorData = new ClientServerError('Something went wrong', { client: url, errors: error.data })
      }
      step.finalize({ body, url, errorData })
      throw errorData
    }
  }

  getDadosPagamento = async (businessKey) => {
    return await this.IngressoGetDadosPagamento.get(businessKey)
  }
}
