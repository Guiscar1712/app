const NotificationService = require('../services/notification.service')
const NotificationFirebaseService = require('../services/notificationFirebase.service')

module.exports = class NotificationPreferenceController {
  static async get (request, response, next) {
    try {
      const data = await NotificationService.list(request.user.id)
      response.json(data)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  static async getById (request, response, next) {
    try {
      const data = await NotificationService.getById(request.params.id, request.user.id)
      response.json(data)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  static async insert (request, response, next) {
    try {
      const { Title, Content, NotificationId } = request.body

      const data = await NotificationService.insert(Title, Content, NotificationId, request.user.id)

      response.json(data)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  static async notificationRead (request, response, next) {
    try {
      const data = await NotificationService.notificationRead(request.params.id, request.user.id)
      response.json(data)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  static async notificationAllRead (request, response, next) {
    try {
      const data = await NotificationService.notificationAllRead(request.user.id)
      response.json(data)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  static async notificationNotRead (request, response, next) {
    try {
      const data = await NotificationService.notificationNotRead(request.params.id, request.user.id)
      response.json(data)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  static async delete (request, response, next) {
    try {
      const data = await NotificationService.delete(request.params.id, request.user.id)
      response.json(data)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  static async sendNotificationTopic (request, response, next) {
    try {
      const { topic, title, body } = request.body

      const res = await NotificationFirebaseService.sendFromTopic(topic, { title, body })
      response.json(res)
    } catch (error) {
      next(error)
    }
  }

  static async sendNotificationClient (request, response, next) {
    try {
      const { token, title, body, data } = request.body

      const res = await NotificationFirebaseService.sendFromClient([token], { title, body, data })
      response.status(200).json(res)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  static async subscribeToTopic (request, response, next) {
    try {
      const { token, topic } = request.body

      const res = await NotificationFirebaseService.subscribeToTopic(token, topic)
      response.json(res)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }

  static async unsubscribeFromTopic (request, response, next) {
    try {
      const { token, topic } = request.body

      const res = await NotificationFirebaseService.unsubscribeFromTopic(token, topic)
      response.json(res)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
}
