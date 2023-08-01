module.exports = class UserController {
  constructor ({ UserService, LoggerService }) {
    this.UserService = UserService
    this.LoggerService = LoggerService
  }

  login = async (request, response, next) => {
    const { email, password } = request.body
    this.LoggerService.Start({
      _indexs: {
        email
      },
      request,
      endpoint: request.originalUrl,
      type: request.method
    })
    const step1 = this.LoggerService.AddStep('UserControllerLogin')

    try {
      const data = await this.UserService.login(email, password)
      step1.finalize(data)
      const res = response.json(data)
      this.LoggerService.SetResponse(res)
      return res
    } catch (error) {
      step1.finalize({ error: { stack: error.stack, message: error.message } })
      this.LoggerService.SetError()
      next(error)
    } finally {
      this.LoggerService.finalize()
    }
  }
}
