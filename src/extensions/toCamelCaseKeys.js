module.exports = function toCamelCaseKeys (obj) {
  if (typeof obj !== 'object' || obj === null) {
    return obj
  }

  if (Array.isArray(obj)) {
    return obj.map(toCamelCaseKeys)
  }

  return Object.keys(obj).reduce((result, key) => {
    const camelCaseKey = key.replace(/_([a-zA-Z])/g, (match, letter) => letter.toUpperCase())
    const lowercaseKey = camelCaseKey.charAt(0).toLowerCase() + camelCaseKey.slice(1)
    result[lowercaseKey] = toCamelCaseKeys(obj[key])
    return result
  }, {})
}
