const NotificationPreferenceRepository = require('../repositories/notificationPreferenceRepository')
const NOTIFICATION_PREFERENCE = require('../enum/NotificationPreference')

module.exports = class NotificationPreference {
  static async list (UserId) {
    return await NotificationPreferenceRepository.filterBy({ UserId })
  }

  static async insert (model, UserId) {
    NotificationPreference.Validate(model)

    const preference = { Preference: model.preference, UserId }

    const hasPreference = await NotificationPreferenceRepository.filterBy(preference)

    if (hasPreference.length > 0) {
      return hasPreference
    }

    return await NotificationPreferenceRepository.insert(preference)
  }

  static Validate (model) {
    if (!Object.values(NOTIFICATION_PREFERENCE)?.includes(model.preference)) {
      throw new Error('Preferência inválida!')
    }
  }

  static async delete (id, UserId) {
    return await NotificationPreferenceRepository.deleteBy({ id, UserId })
  }
}
