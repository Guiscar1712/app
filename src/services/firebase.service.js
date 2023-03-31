const admin = require('firebase-admin')

const serviceAccount = {
  type: process.env.GOOGOLE_TYPE,
  project_id: process.env.GOOGOLE_PROJECT_ID,
  private_key_id: process.env.GOOGOLE_PRIVATE_KEY_ID,
  private_key: process.env.GOOGOLE_PRIVATE_KEY,
  client_email: process.env.GOOGOLE_CLIENT_EMAIL,
  client_id: process.env.GOOGOLE_CLIENT_ID,
  auth_uri: process.env.GOOGOLE_AUTH_URI,
  token_uri: process.env.GOOGOLE_TOKEN_URI,
  auth_provider_x509_cert_url: process.env.GOOGOLE_AUTH_PROVIDER_X509_CERT_URL,
  client_x509_cert_url: process.env.GOOGOLE_CLIENT_X509_CERT_URL
}

const firebaseAdmin = admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
})

const firebaseMessaging = firebaseAdmin.messaging()

module.exports = { firebaseAdmin, firebaseMessaging }
