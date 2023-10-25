const { firebaseAdmin } = require('./config')

const { ClientServerError } = require('../../utils/errors')

module.exports = class FirebaseAdmin {
  constructor({ LoggerService }) {
    this.LoggerService = LoggerService
  }

  authVerifyIdToken = async (token) => {
    const step = this.LoggerService.addStep('FirebaseAdminVerifyIdToken')
    try {
      const tokenId = await firebaseAdmin.auth().verifyIdToken(token)
      step.value.addData(tokenId)
      this.LoggerService.setIndex({
        email: tokenId.email,
        loginType: tokenId.firebase.sign_in_provider,
      })
      return tokenId
    } catch (error) {
      const clientServerError = new ClientServerError(
        'Firebase Verify Id Token error',
        error
      )
      throw clientServerError
    } finally {
      this.LoggerService.finalizeStep(step)
    }
  }
}
