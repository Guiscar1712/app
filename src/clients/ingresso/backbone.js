const axios = require('../../config/axiosConfig')
const config = require('../../utils/config')
const ClientServerAuthError = require('../../utils/errors/ClientServerAuthError')
const ClientServerError = require('../../utils/errors/ClientServerError')
const BackboneRequest = require('../../dto/auth/backbone.response')

const backboneConfig = config.kroton.backbone

class Backbone {
  constructor({ LoggerService }) {
    this.LoggerService = LoggerService
  }

  request = async (document) => {
    const step = this.LoggerService.addStep('IngressoClientBackboneRequest')
    try {
      const res = await axios
        .get(`${backboneConfig.url}/consult-account-data/v1/cpf/${document}`, {
          headers: {
            'apim-authorization': backboneConfig.apim,
            'x-functions-key': backboneConfig.key,
          },
        })
        .catch(function (error) {
          step.value.addData({
            request: error.config,
            response: error.response,
          })
          return error.response
        })

      step.value.addData({
        request: res.config,
        response: res,
      })

      if (res.status === 200) {
        const data = new BackboneRequest(res.data)
        return data
      }

      throw res
    } catch (error) {
      if (error instanceof ClientServerError) {
        throw error
      }

      if (error.status === 401) {
        const errorData = new ClientServerAuthError('Something went wrong', {
          client: url,
          errors: error.data,
        })
        throw errorData
      }

      const errorData = new ClientServerError('Something went wrong', {
        client: url,
        errors: error.data,
      })
      throw errorData
    } finally {
      this.LoggerService.finalizeStep(step)
    }
  }
}

module.exports = Backbone
