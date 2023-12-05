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

  request = async ({ provider, receiver, userId }) => {
    return await this.AuthRequestService.request(provider, receiver, userId)
  }

  login = async ({ provider, userId, token }) => {
    return await this.AuthLoginService.request(provider, userId, token)
  }

  register = async (authRegister) => {
    return await this.AuthRegisterService.request(authRegister)
  }
}
