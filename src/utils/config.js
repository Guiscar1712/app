require('dotenv').config()
const Util = require('./util')

module.exports = {
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresInRecovery: process.env.JWT_EXPIRES_RECOVERY,
  support: process.env.SUPPORT,
  sendGrid: {
    key: process.env.SENDGRID_KEY,
    sender: {
      email: process.env.SENDGRID_SENDER_EMAIL,
      name: process.env.SENDGRID_SENDER_NAME,
    },
    // bcc:process.env.SENDGRID_BCC
  },
  azureBlobsConnection: process.env.AZUREBLOBS_CONNECTION,
  kroton: {
    captacao: {
      url: process.env.KROTON_CAPTACAO_URL,
      vericadorKey: process.env.PROVIDER_COGNA_KEY,
      verificadorKeyIV: process.env.PROVIDER_COGNA_KEY_IV,
      verificadorCipher: process.env.PROVIDER_COGNA_KEY_CIPHER,
      verificadorSMS: process.env.PROVIDER_COGNA_SMS,
      verificadorEmail: process.env.PROVIDER_COGNA_EMAIL,
    },
    ingresso: {
      grant_type: process.env.KROTON_INGRESSO_GRANT_TYPE,
      url: process.env.KROTON_INGRESSO_URL,
      client_id: process.env.KROTON_INGRESSO_CLIENT_ID,
      client_secret: process.env.KROTON_INGRESSO_CLIENT_SECRET,
      OcpApimSubscriptionKey: process.env.KROTON_INGRESSO_SUBSCRIPTION_KEY,
      tokenTolerance:
        Util.toNumber(process.env.KROTON_INGRESSO_TOKEN_TOLERANCE) || 5,
      retries:
        Util.toNumber(process.env.KROTON_INGRESSO_MAX_RETRY_REQUEST) || 1,
      delay: Util.toNumber(process.env.KROTON_INGRESSO_DELAY_RETRIES) || 100,
      enrollments_search_months_ago:
        Util.toNumber(process.env.KROTON_INGRESSO_SEARCH_MONTHS_AGO) || 12,
    },
    backbone: {
      url: process.env.BACKBONE_API_BASE_URL,
      apim: process.env.BACKBONE_API_APIM,
      key: process.env.BACKBONE_API_KEY,
    },
    ci360: {
      url: process.env.KROTON_CI369_URI,
      token: process.env.KROTON_CI369_TOKEN,
      event: process.env.KROTON_CI369_EVENT,
    },
    cognapay: {
      url: process.env.COGNAPAY_BASE_URL,
      tokenTolerance: Util.toNumber(process.env.COGNAPAY_TOKEN_TOLERANCE) || 1,
      colaborar: {
        username: process.env.COGNAPAY_AUTH_USERNAME_COLABORADOR,
        password: process.env.COGNAPAY_AUTH_PASSWORD_COLABORADOR,
      },
      olimpo: {
        username: process.env.COGNAPAY_AUTH_USERNAME_OLIMPO,
        password: process.env.COGNAPAY_AUTH_PASSWORD_OLIMPO,
      },
      sap: {
        username: process.env.COGNAPAY_AUTH_USERNAME_SAP,
        password: process.env.COGNAPAY_AUTH_PASSWORD_SAP,
      },
    },
  },
  providerValidator: {
    'verification-code': {
      email: process.env.PROVIDER_VALIDATION_EMAIL === 'true' ?? false,
      sms: process.env.PROVIDER_VALIDATION_SMS === 'true' ?? false,
      whatsapp: process.env.PROVIDER_VALIDATION_WHATSAPP === 'true' ?? false,
      social: process.env.PROVIDER_VALIDATION_SOCIAL === 'true' ?? false,
    },
    'verification-external-sms': {
      sms: process.env.PROVIDER_VALIDATION_SMS_COGNA === 'true' ?? false,
    },
  },
}
