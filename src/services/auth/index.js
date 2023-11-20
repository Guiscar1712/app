module.exports = class AuthService {
  constructor({
    AuthValidatorService,
    AuthRequestService,
    AuthLoginService,
    LoggerService,
  }) {
    this.AuthValidatorService = AuthValidatorService
    this.AuthRequestService = AuthRequestService
    this.AuthLoginService = AuthLoginService
    this.LoggerService = LoggerService
  }

  validator = async (document) => {
    return await this.AuthValidatorService.request(document)
  }

  request = async ({ receiver, userId }) => {
    return await this.AuthRequestService.request(receiver, userId)
  }

  login = async ({ provider, userId, key }) => {
    return await this.AuthLoginService.request(provider, userId, key)
  }
}
