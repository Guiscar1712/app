module.exports = class AuthUpdateService {
  constructor({ UserHelpers, UserService, UserRepository, LoggerService }) {
    this.UserHelpers = UserHelpers
    this.UserService = UserService
    this.UserRepository = UserRepository
    this.LoggerService = LoggerService
  }

  request = async (user, authUpdate) => {
    const step = this.LoggerService.addStep('AuthUpdateService')
    try {
      const search = await this.UserRepository.findByCpfOrEmailOrPhone(
        authUpdate.cpf,
        authUpdate.email,
        authUpdate.phone
      )

      await this.UserHelpers.RegisterValidation(user.id, authUpdate, search)

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
