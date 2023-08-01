module.exports = function obscureSensitiveData (obj) {
  const sensitiveFields = ['cpf', 'phone', 'birthday', 'number']

  function obscureFields (obj) {
    if (typeof obj === 'object' && obj !== null) {
      for (const [key, value] of Object.entries(obj)) {
        if (sensitiveFields.includes(key) && value) {
          obj[key] = '*'.repeat(value.toString().length)
        } else {
          obscureFields(value)
        }
      }
    }
  }

  const obscuredObj = { ...obj }
  obscureFields(obscuredObj)
  return obscuredObj
}
