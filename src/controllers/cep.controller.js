const CepService = require('../services/cep.service')

module.exports = class CepController {
  static async getInfoAddressByCep(request, response, next) {
    try {
      const cep = request.params.cep
      const info = await CepService.getInfoAddressByCep(cep)
      response.json(info)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
}
