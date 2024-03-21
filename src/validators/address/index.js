const Validator = require('../validator')
const constants = require('../../constants/user.constants')

module.exports = {
  validate(model) {
    const contract = new Validator()

    contract.isRequired(
      model.zipCode,
      constants.REQUIRED_ZIPCODE.code,
      constants.REQUIRED_ZIPCODE.message
    )

    contract.isFixedLen(
      model.zipCode,
      8,
      constants.INVALID_ZIPCODE.code,
      constants.INVALID_ZIPCODE.message
    )

    return contract
  },
}
