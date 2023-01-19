require('dotenv').config()

module.exports = {
  jwtSecret: process.env.JWT_SECRET,
  support: process.env.SUPPORT,
  sendGrid: {
    key: process.env.SENDGRID_KEY,
    sender: process.env.SENDGRID_SENDER
    // bcc:process.env.SENDGRID_BCC
  },
  azureBlobsConnection: process.env.AZUREBLOBS_CONNECTION,
  kroton: {
    ingresso: {
      url: process.env.KROTON_INGRESSO_URL,
      client_id: process.env.KROTON_INGRESSO_CLIENT_ID,
      client_secret: process.env.KROTON_INGRESSO_CLIENT_SECRET,
      OcpApimSubscriptionKey: process.env.KROTON_INGRESSO_SUBSCRIPTION_KEY
    }
  }
}
