module.exports = class AuthService {
  constructor({
    AuthValidatorService,
    AuthRequestService,
    AuthLoginService,
    AuthRegisterService,
    AuthRecoveryService,
    AuthUpdateService,
    LoggerService,
  }) {
    this.AuthValidatorService = AuthValidatorService
    this.AuthRequestService = AuthRequestService
    this.AuthLoginService = AuthLoginService
    this.AuthRegisterService = AuthRegisterService
    this.AuthRecoveryService = AuthRecoveryService
    this.AuthUpdateService = AuthUpdateService
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

  recovery = async (authRecovery) => {
    return await this.AuthRecoveryService.request(authRecovery)
  }

  update = async (user, authUpdate) => {
    return await this.AuthUpdateService.request(user, authUpdate)
  }
}
