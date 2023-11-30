const axios = require('../../../config/axiosConfig')
const config = require('../../../utils/config')
const ClientServerAuthError = require('../../../utils/errors/ClientServerAuthError')
const ClientServerError = require('../../../utils/errors/ClientServerError')

const captacao = {
  base_uri: config.kroton.captacao.url,
}

const url = `${captacao.base_uri}/ksk/v1/token/`

class CaptacaoToken {
  constructor({ LoggerService }) {
    this.LoggerService = LoggerService
  }

  request = async (data) => {
    const step = this.LoggerService.addStep('captacaoTokenRequest')
    try {
      const res = await axios
        .post(`${url}`, data, {
          headers: { 'Content-Type': 'application/json' },
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

      if (res.status === 201) {
        return res.data
      }

      throw res
    } catch (error) {
      if (error instanceof ClientServerError) {
        throw error
      }

      if (error.status === 401) {
        throw new ClientServerAuthError('Access Denied', {
          client: url,
          ...error.data,
        })
      }

      throw new ClientServerError('Something went wrong', {
        client: url,
        ...error.data,
      })
    } finally {
      this.LoggerService.finalizeStep(step)
    }
  }
}

module.exports = CaptacaoToken
