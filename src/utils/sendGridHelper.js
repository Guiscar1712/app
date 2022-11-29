const config = require('./config')

const sgMail = require('@sendgrid/mail')

module.exports = class SendGridHelper{
  static async sendMessage(to, subject, html){
    sgMail.setApiKey(config.sendGrid.key)
    const msg = {
      to,
      bcc: config.sendGrid.bcc,
      from: config.sendGrid.sender,
      subject,
      html
    }
    return await sgMail.send(msg);
  }
}
