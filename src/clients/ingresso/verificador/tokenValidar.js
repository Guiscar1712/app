const axios = require('../../../config/axiosConfig')
const config = require('../../../utils/config')
const ClientServerAuthError = require('../../../utils/errors/ClientServerAuthError')
const ClientServerError = require('../../../utils/errors/ClientServerError')

const captacao = {
  base_uri: config.kroton.captacao.url,
}

const url = `${captacao.base_uri}/ksk/v1/token/validar`

class CaptacaoValidar {
  constructor({ LoggerService }) {
    this.LoggerService = LoggerService
  }

  request = async (data) => {
    const step = this.LoggerService.addStep('IngressoClientPersonalDataRequest')
    try {
      const res = await axios
        .get(`${url}`, {
          params: {
            sistema: data.sistema,
            token: data.token,
          },
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

      if (res.status === 200 || res.status === 400) {
        return res.data?.valido
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

      if (error.status === 404) {
        const errorData = new ClientServerNotFoundError(
          'Something went wrong',
          {
            client: url,
            errors: error.data,
          }
        )
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

module.exports = CaptacaoValidar
