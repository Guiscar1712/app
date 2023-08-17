require('dotenv').config()
const _ = require('lodash')

module.exports = function obscureSensitiveData (obj) {
  const obscuredObj = _.cloneDeep(obj)
  try {
    const sensitiveFields = process.env.OBSCURE_DATA_SENSITIVE || []

    function obscureFields (obscuredObj) {
      if (typeof obscuredObj === 'object' && obscuredObj !== null) {
        for (const [key, value] of Object.entries(obscuredObj)) {
          if (sensitiveFields.includes(key) && value && !key.startsWith('_')) {
            let length = value.toString().length

            if (length > 15) {
              length = 15
            }

            obscuredObj[key] = '*'.repeat(length)
          } else {
            obscureFields(value)
          }
        }
      }
    }

    obscureFields(obscuredObj)
  } catch (error) {
    console.log(error)
  }
  return obscuredObj
}
