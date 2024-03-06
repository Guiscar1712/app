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

  registerValidate(model) {
    const contract = new Validator()

    contract.isRequired(
      model.document,
      constants.REQUIRED_DOCUMENT.code,
      constants.REQUIRED_DOCUMENT.message
    )

    if (model.document) {
      contract.isValidCpf(
        Util.getNumbers(model.document),
        constants.INVALID_DOCUMENT.code,
        constants.INVALID_DOCUMENT.message
      )
    }

    contract.isRequired(
      model.name,
      constants.REQUIRED_NAME.code,
      constants.REQUIRED_NAME.message
    )

    contract.isEmail(
      model.email,
      constants.INVALID_EMAIL.code,
      constants.INVALID_EMAIL.message
    )

    contract.isRequired(
      model.phone,
      constants.REQUIRED_PHONE.code,
      constants.REQUIRED_PHONE.message
    )

    return contract
  },

  registerExistValidate(model) {
    const contract = new Validator()

    contract.isRequired(
      !model.document,
      constants.EXIST_DOCUMENT.code,
      constants.EXIST_DOCUMENT.message
    )

    contract.isRequired(
      !model.email,
      constants.EXIST_EMAIL.code,
      constants.EXIST_EMAIL.message
    )

    contract.isRequired(
      !model.phone,
      constants.EXIST_PHONE.code,
      constants.EXIST_PHONE.message
    )

    return contract
  },

  recoveryValidate(model) {
    const contract = new Validator()

    contract.isRequired(
      model.userId,
      constants.REQUIRED_USER_ID.code,
      constants.REQUIRED_USER_ID.message
    )

    contract.isValidCpf(
      model.document,
      constants.INVALID_DOCUMENT.code,
      constants.INVALID_DOCUMENT.message
    )

    contract.isDateValid(
      model.birthday,
      constants.REQUIRED_BIRTHDAY.code,
      constants.REQUIRED_BIRTHDAY.message
    )

    contract.isRequired(
      model.name,
      constants.REQUIRED_NAME.code,
      constants.REQUIRED_NAME.message
    )

    contract.isRequired(
      model.motherName,
      constants.REQUIRED_MOTHER_NAME.code,
      constants.REQUIRED_MOTHER_NAME.message
    )

    return contract
  },

  updateValidate(model) {
    const contract = new Validator()

    if (!model.email && !model.phone) {
      contract.errorsPush(constants.REQUIRED_EMAIL_OR_PHONE)
    }

    if (model.email) {
      contract.isEmail(
        model.email,
        constants.INVALID_EMAIL.code,
        constants.INVALID_EMAIL.message
      )
    }

    if (model.phone) {
      contract.isPhone(
        model.phone,
        constants.INVALID_PHONE.code,
        constants.INVALID_PHONE.message
      )
    }
    return contract
  },
}
