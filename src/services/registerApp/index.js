module.exports = class RegisterAppService {
  constructor({ RegisterAppSaveService, LoggerService }) {
    this.RegisterAppSaveService = RegisterAppSaveService
    this.LoggerService = LoggerService
  }

  save = async (tokenFirebase, userId) => {
    return await this.RegisterAppSaveService.save(tokenFirebase, userId)
  }
}
