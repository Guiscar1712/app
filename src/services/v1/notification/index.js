module.exports = class NotificationService {
  constructor({
    NotificationGetByIdService,
    NotificationListService,
    NotificationReadService,
    NotificationReadAllService,
    NotificationNotReadService,
    NotificationSaveService,
    NotificationDeleteService,
  }) {
    this.NotificationGetByIdService = NotificationGetByIdService
    this.NotificationListService = NotificationListService
    this.NotificationReadService = NotificationReadService
    this.NotificationReadAllService = NotificationReadAllService
    this.NotificationNotReadService = NotificationNotReadService
    this.NotificationSaveService = NotificationSaveService
    this.NotificationDeleteService = NotificationDeleteService
  }

  getById = async (Id, UserId) => {
    return await this.NotificationGetByIdService.request(Id, UserId)
  }

  list = async (UserId) => {
    return await this.NotificationListService.request(UserId)
  }

  read = async (Id, UserId) => {
    return await this.NotificationReadService.request(Id, UserId)
  }

  readAll = async (UserId) => {
    return await this.NotificationReadAllService.request(UserId)
  }

  notRead = async (Id, UserId) => {
    return await this.NotificationNotReadService.request(Id, UserId)
  }

  save = async (notification) => {
    return await this.NotificationSaveService.request(notification)
  }

  delete = async (Id, UserId) => {
    return await this.NotificationDeleteService.request(Id, UserId)
  }
}
