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
    sendGridHelper.sendMessage(config.support, 'Kroton - Vitrine', htmlEmail)
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

  static async recoverPassword (email, code) {
    const htmlEmail =
    '<h3>Seu código para autenticação em duas etapas</h3>' +
    '<p>Recebemos uma solicitação de acesso à sua conta. Utilize o código abaixo para confirmar:</p>'+
    '<h2>' + code + '</h2>'

    return await sendGridHelper.sendMessage(email, '00vitrine - Codigo', htmlEmail)
  }
}
