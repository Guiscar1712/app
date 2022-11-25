const config = require('./config')

const sgMail = require('@sendgrid/mail')

module.exports = class SendGridHelper{
  static async sendMessage(to, subject, html){
    sgMail.setApiKey(config.sendGridKey)
    const msg = {
      to,
      bcc: config.SENDGRID.BCC,
      from: config.SENDGRID.FROM,
      subject,
      html
    }
    sgMail.send(msg);
  }
}
