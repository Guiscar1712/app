require('dotenv').config()
const _ = require('lodash')

module.exports = function obscureSensitiveData(obj) {
  const obscuredObj = _.cloneDeep(obj)
  try {
    const dataSenditive = process.env.OBSCURE_DATA_SENSITIVE || []

    const sensitiveFields = dataSenditive.split(',').map((string) => {
      return string.toLowerCase()
    })

    function obscureFields(obscuredObj) {
      if (typeof obscuredObj === 'object' && obscuredObj !== null) {
        for (const [key, value] of Object.entries(obscuredObj)) {
          const keyLowerCase = key.toLowerCase()
          if (
            sensitiveFields.includes(keyLowerCase) &&
            value &&
            !keyLowerCase.startsWith('_')
          ) {
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
