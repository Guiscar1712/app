const Validator = require('../validator')
const Util = require('../../utils/util')
const constants = require('../../constants/auth.constants')

module.exports = {
  requestValidate(model) {
    const contract = new Validator()

    contract.isRequired(
      model.receiver,
      constants.REQUIRED_RECEIVER.code,
      constants.REQUIRED_RECEIVER.message
    )

    contract.isRequired(
      model.userId,
      constants.REQUIRED_USER_ID.code,
      constants.REQUIRED_USER_ID.message
    )
    return contract
  },

  loginValidate(model) {
    const contract = new Validator()

    contract.isRequired(
      model.provider,
      constants.REQUIRED_PROVIDER.code,
      constants.REQUIRED_PROVIDER.message
    )

    contract.isRequired(
      model.token,
      constants.REQUIRED_TOKEN.code,
      constants.REQUIRED_TOKEN.message
    )

    contract.isRequired(
      model.userId,
      constants.REQUIRED_USER_ID.code,
      constants.REQUIRED_USER_ID.message
    )
    return contract
  },
}
