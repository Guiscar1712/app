
const { firebaseMessaging } = require('../services/firebase.service')

const UserRepository = require('../repositories/userRepository')
const RegisterAppRepository = require('../repositories/RegisterAppRepository')

module.exports = class NotificationFirebaseService {
  static async updateSubscribeToTopic (userId) {
    const tokens = await RegisterAppRepository.listByUserId(userId)

    if (!tokens) {
      return
    }

    const user = await UserRepository.findById(userId)

    const topics = []
    topics.push({ topic: 'notifyFreeCourses', value: user.notifyFreeCourses })
    topics.push({ topic: 'notifyEvents', value: user.notifyEvents })
    topics.push({ topic: 'notifyPromotions', value: user.notifyPromotions })
    topics.push({ topic: 'alertWarnings', value: user.alertWarnings })
    topics.push({ topic: 'alertTeatchers', value: user.alertTeatchers })

    topics.forEach(el => {
      if (el.value) {
        tokens.forEach(token => {
          this.subscribeToTopic(token.token, el.topic)
        })
      } else {
        tokens.forEach(token => {
          this.unsubscribeFromTopic(token.token, el.topic)
        })
      }
    })
  }

  static async subscribeToTopic (tokenClient, topic) {
    const registrationTokens = [tokenClient]

    try {
      return await firebaseMessaging.subscribeToTopic(registrationTokens, topic)
    } catch (error) {
      return error
    }
  }

  static async unsubscribeFromTopic (tokenClient, topic) {
    const registrationTokens = [tokenClient]

    try {
      return await firebaseMessaging.unsubscribeFromTopic(registrationTokens, topic)
    } catch (error) {
      return error
    }
  }

  static async sendFromClient (tokenClient, message) {
    const payload = {
      token: tokenClient,
      notification: message,
      data: message
    }

    try {
      return await firebaseMessaging.send(payload)
    } catch (error) {
      return error
    }
  }

  static async sendFromTopic (topic, message) {
    const params = {
      data: message,
      topic
    }

    try {
      return await firebaseMessaging.send(params)
    } catch (error) {
      return error
    }
  }
}
