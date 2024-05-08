module.exports = class UserHelpers {
  constructor({ UserHelpersRegisterValidation, LoggerService }) {
    this.UserHelpersRegisterValidation = UserHelpersRegisterValidation
    this.LoggerService = LoggerService
  }

  RegisterValidation = async (userId, entity, search) => {
    return await this.UserHelpersRegisterValidation.request(
      userId,
      entity,
      search
    )
  }
}
