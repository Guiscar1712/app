require('dotenv').config()

module.exports = {
  jwtSecret: process.env.JWT_SECRET,
  support: process.env.SUPPORT,
  sendGrid: {
    key: process.env.SENDGRID_KEY,
    sender:
    {
      email: process.env.SENDGRID_SENDER_EMAIL,
      name: process.env.SENDGRID_SENDER_NAME
    }
    // bcc:process.env.SENDGRID_BCC
  },
  azureBlobsConnection: process.env.AZUREBLOBS_CONNECTION,
  kroton: {
    ingresso: {
      grant_type: process.env.KROTON_INGRESSO_GRANT_TYPE,
      url: process.env.KROTON_INGRESSO_URL,
      client_id: process.env.KROTON_INGRESSO_CLIENT_ID,
      client_secret: process.env.KROTON_INGRESSO_CLIENT_SECRET,
      OcpApimSubscriptionKey: process.env.KROTON_INGRESSO_SUBSCRIPTION_KEY
    },
    ci360: {
      url: process.env.KROTON_CI369_URI,
      token: process.env.KROTON_CI369_TOKEN,
      event: process.env.KROTON_CI369_EVENT
    },
    cognapay: {
      url: process.env.COGNAPAY_BASE_URL,
      colaborar: {
        username: process.env.COGNAPAY_AUTH_USERNAME_COLABORADOR,
        password: process.env.COGNAPAY_AUTH_PASSWORD_COLABORADOR
      },
      olimpo: {
        username: process.env.COGNAPAY_AUTH_USERNAME_OLIMPO,
        password: process.env.COGNAPAY_AUTH_PASSWORD_OLIMPO
      },
      sap: {
        username: process.env.COGNAPAY_AUTH_USERNAME_SAP,
        password: process.env.COGNAPAY_AUTH_PASSWORD_SAP
      }
    }
  }
}
