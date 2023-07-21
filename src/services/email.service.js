const config = require('../utils/config')
const templateEmail = require('../utils/templateEmail')
const sendGridHelper = require('../utils/sendGridHelper')

module.exports = class EmailService {
  static async addLog (email, subject, html) {
    // const log = {
    //    email,
    //    subject,
    //    html
    // };
    // return (await (new LogEmailRepository()).save(log));
  }

  static async contactUs (name, email, message) {
    const htmlEmail =
            'Nome:' + name + '<br />' +
            'Email:' + email + '<br />' +
            'Message:' + message

    // addLog(config.support, "Fale Conosco", htmlEmail);
    sendGridHelper.sendMessage(config.support, 'Graduação Anhanguera - Código de Verificação', htmlEmail)
  }

  static async byTemplate (params) {
    const templateParams = [
      {
        name: '',
        value: params.name
      }
    ]
    const htmlEmail = templateEmail.get(params.template, templateParams)
    sendGridHelper.sendMessage(params.user.email, params.title, htmlEmail)
  }

  static async recoverPassword (email, name, code) {
    const templateParams = [
      {
        name: 'name_candidato',
        value: name
      },
      {
        name: 'code_recovery',
        value: code
      }
    ]
    const htmlEmail = templateEmail.get(process.env.RECOVERPASSWORD_TEMPLATE, templateParams)
    return await sendGridHelper.sendMessage(email, process.env.RECOVERPASSWORD_TITLE, htmlEmail)
  }

  static async send (email, templateData, templateName, templateTitle) {
    const htmlEmail = templateEmail.get(templateName, templateData)
    return await sendGridHelper.sendMessage(email, templateTitle, htmlEmail)
  }
}
