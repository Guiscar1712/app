const templateEmail = require('../../utils/templateEmail')
const sendGridHelper = require('../../utils/sendGridHelper')

const { ClientServerError } = require('../../utils/errors')

module.exports = class SendGridServer {
  constructor ({ LoggerService }) {
    this.LoggerService = LoggerService
  }

  send = async (email, templateData, templateName, templateTitle) => {
    const stepSend = this.LoggerService.addStep('SendGridSend')
    try {
      const htmlEmail = templateEmail.get(templateName, templateData)
      const result = await sendGridHelper.sendMessage(email, templateTitle, htmlEmail)
      const stepResult = result.length > 0 ? result[0] : result
      stepSend.finalize(stepResult)
      return result
    } catch (error) {
      const clientServerError = new ClientServerError('Sendgrid Error', error)
      stepSend.finalize(clientServerError)
      throw clientServerError
    }
  }
}
