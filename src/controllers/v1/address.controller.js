const Util = require('../../utils/util')
const { ValidationError } = require('../../utils/errors')
const { validate } = require('../../validators/address')
const constants = require('../../constants/user.constants')

module.exports = class AddressController {
  constructor({ AddressService, LoggerService }) {
    this.AddressService = AddressService
    this.LoggerService = LoggerService
  }

  addressByZipCode = async (request, response, next) => {
    try {
      const step = this.LoggerService.addStep(
        'AddressControllerAddressByZipCode'
      )

      const zipCode = Util.getNumbers(request.params.zipcode)

      const contract = validate({ zipCode })
      if (!contract.isValid()) {
        throw new ValidationError(
          'Parâmetros inválidos',
          contract.errors(),
          constants.code
        )
      }

      const data = await this.AddressService.addressByZipCode(zipCode)
      response.code = 200
      step.value.addData(data)
      this.LoggerService.finalizeStep(step)
      next(data)
    } catch (error) {
      next(error)
    }
  }
}
