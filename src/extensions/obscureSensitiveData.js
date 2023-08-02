require('dotenv').config()

module.exports = function obscureSensitiveData (obj) {
  const obscuredObj = { ...obj }
  try {
    const sensitiveFields = process.env.OBSCURE_DATA_SENSITIVE || []

    function obscureFields (obj) {
      if (typeof obj === 'object' && obj !== null) {
        for (const [key, value] of Object.entries(obj)) {
          if (sensitiveFields.includes(key) && value && !key.startsWith('_')) {
            let length = value.toString().length

            if (length > 15) {
              length = 15
            }

            obj[key] = '*'.repeat(length)
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
