const { ValidationError, ClientServerError } = require('../../utils/errors')
const {
  notificationSave,
  notificationList,
  notificationById,
  notificationDelete,
  notificationRead,
  notificationAllRead,
  notificationNotRead
} = require('./../../services/notification')

module.exports = class NotificationController {
  static async save (request, response, next) {
    try {
      const { title, content, notificationId, data } = request.body

      if (!title || !content) {
        throw new ValidationError('Parâmetros inválidos', [{}])
      }

      const notification = await notificationSave(title, content, notificationId, data, request.user.id)
      if (notification && notification.title) {
        return response.status(201).json(notification)
      }
      throw new ClientServerError('Something went wrong', notification)
    } catch (error) {
      next(error)
    }
  }

  static async get (request, response, next) {
    try {
      const data = await notificationList(request.user.id)
      return response.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }

  static async getById (request, response, next) {
    try {
      const data = await notificationById(request.params.id, request.user.id)
      return response.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }

  static async delete (request, response, next) {
    try {
      if (!request.params.id) {
        throw new ValidationError('Parâmetros inválidos', [{}])
      }
      const data = await notificationDelete(request.params.id, request.user.id)

      if (data && data[0].id > 0) {
        return response.status(200).send()
      }

      throw new ClientServerError('Something went wrong', [{}])
    } catch (error) {
      next(error)
    }
  }

  static async read (request, response, next) {
    try {
      if (!request.params.id) {
        throw new ValidationError('Parâmetros inválidos', [{}])
      }
      const data = await notificationRead(request.params.id, request.user.id)
      if (data && data.dateRead) {
        return response.status(200).send()
      }

      throw new ClientServerError('Something went wrong', [{}])
    } catch (error) {
      next(error)
    }
  }

  static async readAll (request, response, next) {
    try {
      const data = await notificationAllRead(request.user.id)
      if (data && data.dateRead) {
        return response.status(200).send()
      }

      throw new ClientServerError('Something went wrong', [{}])
    } catch (error) {
      next(error)
    }
  }

  static async readNot (request, response, next) {
    try {
      if (!request.params.id) {
        throw new ValidationError('Parâmetros inválidos', [{}])
      }
      const data = await notificationNotRead(request.params.id, request.user.id)
      if (data && data.dateRead === null) {
        return response.status(200).send()
      }

      throw new ClientServerError('Something went wrong', [{}])
    } catch (error) {
      next(error)
    }
  }
}
