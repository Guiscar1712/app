const cep = require('cep-promise')

module.exports = class CepService {
  static async getInfoAddressByCep (cepValue) {
    try {
      return await cep(cepValue)
    } catch (error) {
      throw new Error(error)
    }
  }
}
