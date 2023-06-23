
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
    topics.push({ topic: 'NotifyFreeCourses', value: user.notifyFreeCourses })
    topics.push({ topic: 'NotifyEvents', value: user.notifyEvents })
    topics.push({ topic: 'NotifyPromotions', value: user.notifyPromotions })
    topics.push({ topic: 'AlertWarnings', value: user.alertWarnings })
    topics.push({ topic: 'AlertTeatchers', value: user.alertTeatchers })

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

  static async sendFromClient (tokenClients, message, data) {
    // const payload = [
    //   {
    //     token: 'fRBWQ8lERfiLbZA3oXglUn:APA91bHcPzGrvuz96-Yaee3EhD3tN4rgC49exIJpXaiMqaKe9ycBGZmOiTvBi2K5Wsi5qhfSd80jWWJQ1i-dk-636HeH4Bh0fkLWPLe_aQa3VAojkyf8nH6Vt7N8RWL8rLQCYW1XQG30',
    //     notification: { title: 'Confirmação de pagamento' body: '' }
    //   }
    // ]

    const payload = []
    // notification: { title: message, body, imageUrl }
    tokenClients.forEach(token => {
      payload.push(
        {
          token,
          notification: { title: message, body: data }
        }
      )
    })

    try {
      return await firebaseMessaging.sendAll(payload)
    } catch (error) {
      console.log(error)
      return error
    }
  }

  static async sendFromTopic (topic, message) {
    const params = {
      data: message,
      notification: message,
      topic
    }

    try {
      return await firebaseMessaging.send(params)
    } catch (error) {
      return error
    }
  }
}
