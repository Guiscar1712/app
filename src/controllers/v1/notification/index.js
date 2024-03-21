module.exports = class NotificationController {
  constructor({
    NotificationGetByIdController,
    NotificationListController,
    NotificationReadController,
    NotificationReadAllController,
    NotificationNotReadController,
    NotificationSaveController,
    NotificationDeleteController,
  }) {
    this.NotificationGetByIdController = NotificationGetByIdController
    this.NotificationListController = NotificationListController
    this.NotificationReadController = NotificationReadController
    this.NotificationReadAllController = NotificationReadAllController
    this.NotificationNotReadController = NotificationNotReadController
    this.NotificationSaveController = NotificationSaveController
    this.NotificationDeleteController = NotificationDeleteController
  }

  getById = async (request, response, next) => {
    return await this.NotificationGetByIdController.request(
      request,
      response,
      next
    )
  }

  list = async (request, response, next) => {
    return await this.NotificationListController.request(
      request,
      response,
      next
    )
  }

  read = async (request, response, next) => {
    return await this.NotificationReadController.request(
      request,
      response,
      next
    )
  }

  readAll = async (request, response, next) => {
    return await this.NotificationReadAllController.request(
      request,
      response,
      next
    )
  }

  notRead = async (request, response, next) => {
    return await this.NotificationNotReadController.request(
      request,
      response,
      next
    )
  }

  save = async (request, response, next) => {
    return await this.NotificationSaveController.request(
      request,
      response,
      next
    )
  }

  delete = async (request, response, next) => {
    return await this.NotificationDeleteController.request(
      request,
      response,
      next
    )
  }
}
