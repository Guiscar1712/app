require('dotenv').config()
const jwt = require('jsonwebtoken')
const moment = require('moment')
const axios = require('axios').create({ timeout: 1000000 })
const config = require('../../utils/config')
const { ClientServerError, ClientServerAuthError } = require('../../utils/errors')

const cognaPayConfig = { ...config.kroton.cognapay }

const url = `${cognaPayConfig.url}/api/authentication/GenerateToken`

module.exports = class CognaPayToken {
  constructor ({ LoggerService }) {
    this.LoggerService = LoggerService
  }

  get = async (system) => {
    const step = this.LoggerService.addStep('CognaPayClientGetToken')
    try {
      const tokenCognapay = this.getTokenEnv(system)

      if (tokenCognapay === null) {
        const token = await this.getToken(system)
        step.finalize({ system, token })
        return token
      }

      step.finalize({ url, system, token: tokenCognapay })
      return tokenCognapay
    } catch (error) {
      if (error instanceof ClientServerError) {
        step.finalize({ url, system, error })
        throw error
      }

      if (error.status === 401) {
        const errorData = new ClientServerAuthError('Something went wrong', { client: url, errors: error.data })
        step.finalize({ system, errorData })
        throw errorData
      }

      const errorData = new ClientServerError('Something went wrong', { client: url, errors: error.data })
      step.finalize({ system, errorData })
      throw errorData
    }
  }

  async getToken (system) {
    const auth = await this.getParams(system)

    const res = await axios.get(url, {
      auth
    }).catch(function (error) {
      return error.response
    })
    if (res.status === 200) {
      this.setTokenEnv(res.data, system)
      return res.data
    } else {
      throw res
    }
  }

  getTokenEnv (system) {
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

  setTokenEnv (accessToken, system) {
    const decodedToken = jwt.decode(accessToken)
    const expirationDateToken = moment(decodedToken.exp * 1000)
    const expirationDate = expirationDateToken.subtract(cognaPayConfig.tokenTolerance, 'minute')

    const token = {
      expirationDate,
      accessToken
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

  getParams (system) {
    if (system === 'COLABORAR') {
      return { ...cognaPayConfig.colaborar }
    } else if (system === 'OLIMPO') {
      return { ...cognaPayConfig.olimpo }
    } else if (system === 'SAP' || system === 'ATHENAS') {
      return { ...cognaPayConfig.sap }
    }
  }
}
