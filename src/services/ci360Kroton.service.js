const axios = require('axios').create({ timeout: 1000000 })
const config = require('../utils/config')

const ci360 = { ...config.kroton.ci360 }

module.exports = class ci360KrotonService {
  static async sendCodeEmail (name, email, code) {
    const body = {
      eventName: ci360.event,
      customer_id: email,
      ds_nome: name,
      ds_email_pessoal: email,
      cd_validacao: code
    }

    const res = await axios.post(
      ci360.url,
      body,
      {
        headers: {
          Authorization: 'Bearer ' + ci360.token,
          'Content-Type': 'application/json'
        }
      }
    )

    if (res.status === 201) {
      return [{ code: 201, message: 'security code sent' }]
    } else {
      console.log(res)
      return [{ code: 500, message: 'send security code failed' }]
    }
  }
}
