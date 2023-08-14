const { firebaseAdmin } = require('./config')

const { ClientServerError } = require('../../utils/errors')

module.exports = class FirebaseAdmin {
  constructor ({ LoggerService }) {
    this.LoggerService = LoggerService
  }

  authVerifyIdToken = async (token) => {
    const stepAuthVerifyIdToken = this.LoggerService.addStep('FirebaseAdminVerifyIdToken')
    try {
      const tokenId = await firebaseAdmin.auth().verifyIdToken(token)
      stepAuthVerifyIdToken.finalize(tokenId)
      this.LoggerService.setIndex({ email: tokenId.email, loginType: tokenId.firebase.sign_in_provider })
      return tokenId
    } catch (error) {
      const clientServerError = new ClientServerError('Firebase Verify Id Token error', error)
      stepAuthVerifyIdToken.finalize(clientServerError)
      throw clientServerError
    }
  }
}
