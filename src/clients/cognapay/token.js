require('dotenv').config()
const jwt = require('jsonwebtoken')
const moment = require('moment')
const axios = require('../../config/axiosConfig')
const config = require('../../utils/config')
const {
  ClientServerError,
  ClientServerAuthError,
} = require('../../utils/errors')

const cognaPayConfig = { ...config.kroton.cognapay }

const url = `${cognaPayConfig.url}/api/authentication/GenerateToken`

module.exports = class CognaPayToken {
  constructor({ LoggerService }) {
    this.LoggerService = LoggerService
  }

  request = async (system) => {
    const step = this.LoggerService.addStepStepTrace(
      'CognaPayClientTokenRequest'
    )

    try {
      const tokenCognapay = this.getTokenEnv(system)
      if (tokenCognapay === null) {
        const token = await this.getToken(system, step)
        return token
      }

      this.LoggerService.finalizeStep({
        system,
        token: tokenCognapay,
        tokenInMemory: true,
      })
      return tokenCognapay
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
    }
  }

  async getToken(system, step) {
    const auth = await this.getParams(system)

    const res = await axios
      .get(url, {
        auth,
      })
      .catch(function (error) {
        this.LoggerService.finalizeStep(step.value, step.key, {
          request: error.config,
          response: error.response,
        })
        return error.response
      })

    this.LoggerService.finalizeStep(step.value, step.key, {
      request: res.config,
      response: res,
    })

    if (res.status === 200) {
      this.setTokenEnv(res.data, system)
      return res.data
    } else {
      throw res
    }
  }

  getTokenEnv(system) {
    let tokenEnv

    if (system === 'COLABORAR') {
      tokenEnv = process.env.COGNAPAY_TOKEN_COLABORAR
    } else if (system === 'OLIMPO') {
      tokenEnv = process.env.COGNAPAY_TOKEN_OLIMPO
    } else if (system === 'SAP' || system === 'ATHENAS') {
      tokenEnv = process.env.COGNAPAY_TOKEN_SAP
    }

    if (tokenEnv === null || tokenEnv === undefined) {
      return null
    }

    const token = JSON.parse(tokenEnv)
    const dateExp = moment(token.expirationDate)
    const dateNow = moment()
    const diffInSeconds = dateExp.diff(dateNow, 'seconds')

    if (diffInSeconds <= 0) {
      return null
    }

    return token.accessToken
  }

  setTokenEnv(accessToken, system) {
    const decodedToken = jwt.decode(accessToken)
    const expirationDateToken = moment(decodedToken.exp * 1000)
    const expirationDate = expirationDateToken.subtract(
      cognaPayConfig.tokenTolerance,
      'minute'
    )

    const token = {
      expirationDate,
      accessToken,
    }

    const tokenStr = JSON.stringify(token)

    if (system === 'COLABORAR') {
      process.env.COGNAPAY_TOKEN_COLABORAR = tokenStr
    } else if (system === 'OLIMPO') {
      process.env.COGNAPAY_TOKEN_OLIMPO = tokenStr
    } else if (system === 'SAP' || system === 'ATHENAS') {
      process.env.COGNAPAY_TOKEN_SAP = tokenStr
    }
  }

  getParams(system) {
    if (system === 'COLABORAR') {
      return { ...cognaPayConfig.colaborar }
    } else if (system === 'OLIMPO') {
      return { ...cognaPayConfig.olimpo }
    } else if (system === 'SAP' || system === 'ATHENAS') {
      return { ...cognaPayConfig.sap }
    }
  }
}
