module.exports = class AuthUpdateService {
  constructor({ UserService, UserRepository, LoggerService }) {
    this.UserService = UserService
    this.UserRepository = UserRepository
    this.LoggerService = LoggerService
  }

  request = async (user, authUpdate) => {
    const step = this.LoggerService.addStep('AuthUpdateService')
    try {
      user = await this.UserRepository.update(user.id, authUpdate)

      step.value.addData(user)

      return user
    } catch (error) {
      throw error
    } finally {
      this.LoggerService.finalizeStep(step)
    }
  }
}
