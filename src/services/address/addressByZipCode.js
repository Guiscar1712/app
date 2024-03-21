const cep = require('cep-promise')

module.exports = class AddressServiceInfoAddress {
  constructor({ LoggerService }) {
    this.LoggerService = LoggerService
  }

  request = async (zipCode) => {
    const step = this.LoggerService.addStep('AddressServiceInfoAddress')
    try {
      const infoAddress = await cep(zipCode)

      step.value.addData(infoAddress)

      return infoAddress
    } catch (error) {
      throw error
    } finally {
      this.LoggerService.finalizeStep(step)
    }
  }
}
