const axios = require('axios').create({ timeout: 1000000 })
const config = require('../utils/config')
const { getSubscriptionDto } = require('../dto/subscription')
const { getExamInfo, getTheme } = require('../dto/exam')

const ingresso = {
  grant_type: 'client_credentials',
  client_id: config.kroton.ingresso.client_id,
  client_secret: config.kroton.ingresso.client_secret,
  base_uri: config.kroton.ingresso.url,
  OcpApimSubscriptionKey: config.kroton.ingresso.OcpApimSubscriptionKey
}

module.exports = class IngressoKrotonService {
  static async getToken () {
    const body = new URLSearchParams({
      grant_type: ingresso.grant_type,
      client_id: ingresso.client_id,
      client_secret: ingresso.client_secret
    })

    return (
      await axios.post(ingresso.base_uri + '/oauth2/token', body, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
    ).data
  }

  static async getSubscription (cpf, token) {
    const res =
      await axios.get(
        `${ingresso.base_uri}/ms/inscricaocqrs/captacao/v5/inscricao/cpf/${cpf}`,
        {
          headers: {
            'Ocp-Apim-Subscription-Key': ingresso.OcpApimSubscriptionKey,
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
        `${ingresso.base_uri}/ms/inscricaocqrs/captacao/v5/inscricao`,
        body,
        {
          headers: {
            'Ocp-Apim-Subscription-Key': ingresso.OcpApimSubscriptionKey,
            'Content-Type': 'application/json',
            Authorization: token
          }
        }
      )
    ).data
  }

  static async eligibleExam (subscriptionKey, token) {
    try {
      const res = await axios.get(
        `${ingresso.base_uri}/ms/inscricao/v4/captacao/prova-online/businesskey/${subscriptionKey}`,
        {
          headers: {
            'Ocp-Apim-Subscription-Key': ingresso.OcpApimSubscriptionKey,
            Authorization: token
          }
        }
      ).catch(function (error) {
        return error.response
      })

      if (res.status === 200) {
        return res.data
      }
      if (res.status === 400) {
        return { errors: [{ code: 40201, message: 'Número de inscrição inválido' }] }
      }
    } catch (error) {
      console.log(error)
    }
  }

  static async fetchExam (subscriptionKey, token) {
    const subscriptionKeyEncode = Buffer.from(subscriptionKey, 'utf8').toString('base64')
    try {
      const res = await axios.get(
        `${ingresso.base_uri}/captacao/consultas/captacao/v1/consulta-provaonline/inscricao/${subscriptionKeyEncode}`,
        {
          headers: {
            'Ocp-Apim-Subscription-Key': ingresso.OcpApimSubscriptionKey,
            Authorization: token
          }
        }
      ).catch(function (error) {
        return error.response
      })

      if (res.status === 200) {
        return getExamInfo(res.data)
      }
      if (res.status === 400) {
        return { errors: [{ code: 40201, message: 'Número de inscrição inválido' }] }
      }
    } catch (error) {
      console.log(error)
    }
  }

  static async startExam (subscriptionKey, token) {
    const subscriptionKeyEncode = Buffer.from(subscriptionKey, 'utf8').toString('base64')

    try {
      const res = await axios.post(
        `${ingresso.base_uri}/captacao/salva/captacao/v1/salva-provaonline/iniciarProva/${subscriptionKeyEncode}`,
        null,
        {
          headers: {
            'Ocp-Apim-Subscription-Key': ingresso.OcpApimSubscriptionKey,
            Authorization: 'Bearer ' + token
          }
        }
      ).catch(function (error) {
        return error.response
      })

      if (res.status === 200) {
        return getTheme(res.data)
      }

      if (res.status === 400) {
        return { errors: [{ code: 40201, message: 'Número de inscrição inválido' }] }
      }
    } catch (error) {
      console.log(error)
    }
  }

  static async submitExam (subscriptionKey, data, token) {
    const subscriptionKeyEncode = Buffer.from(subscriptionKey, 'utf8').toString('base64')

    try {
      const body = {
        titulo: data.title,
        texto: data.text
      }

      const res = await axios.post(
        `${ingresso.base_uri}/captacao/salva/captacao/v1/salva-provaonline/finalizarProva/${subscriptionKeyEncode}`,
        body,
        {
          headers: {
            'Ocp-Apim-Subscription-Key': ingresso.OcpApimSubscriptionKey,
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token
          }
        }
      ).catch(function (error) {
        return error.response
      })

      if (res.status === 204) {
        return
      }

      if (res.status === 400) {
        return { errors: [{ code: 40201, message: 'Número de inscrição inválido' }] }
      }
    } catch (error) {
      console.log(error)
    }
  }
}
