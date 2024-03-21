const Validator = require('../validator')
const constants = require('../../constants/notification.constants')

module.exports = {
  requestValidate(model) {
    const contract = new Validator()

    contract.isRequired(
      model.notificationId,
      constants.REQUIRED_NOTIFICATION_ID.code,
      constants.REQUIRED_NOTIFICATION_ID.message
    )

    contract.isRequired(
      model.title,
      constants.REQUIRED_TITLE.code,
      constants.REQUIRED_TITLE.message
    )

    contract.isRequired(
      model.content,
      constants.REQUIRED_CONTENT.code,
      constants.REQUIRED_CONTENT.message
    )
    return contract
  },
}
