const Validator = require('../validator')
const constants = require('../../constants/payment.constants')

module.exports = {
  ApplyValidate(value) {
    const contract = new Validator()

    contract.isRequired(
      value,
      constants.REQUIRED_ORIGINID.code,
      constants.REQUIRED_ORIGINID.message
    )

    return contract
  },
}
