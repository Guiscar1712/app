const UTIL = require('../utils/util')

let errors = []

function ValidationContract() {
  errors = []
}

ValidationContract.prototype.isRequired = (value, code, message) => {
  if (!value || value.length <= 0) {
    errors.push({ code, message })
  }
}

ValidationContract.prototype.hasMinLen = (value, min, code, message) => {
  if (value && value.length < min) {
    errors.push({ code, message })
  }
}

ValidationContract.prototype.hasNumMin = (value, min, code, message) => {
  if (value && value < min) {
    errors.push({ code, message })
  }
}

ValidationContract.prototype.hasMaxLen = (value, max, code, message) => {
  if (value && value.length > max) {
    errors.push({ code, message })
  }
}

ValidationContract.prototype.hasNumMax = (value, max, code, message) => {
  if (value && value > max) {
    errors.push({ code, message })
  }
}

ValidationContract.prototype.isFixedLen = (value, len, code, message) => {
  if (value && value.length !== len) {
    errors.push({ code, message })
  }
}

ValidationContract.prototype.isEmail = (value, code, message) => {
  // eslint-disable-next-line prefer-regex-literals
  const reg = new RegExp(/^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/)
  if (!reg.test(value)) {
    errors.push({ code, message })
  }
}

ValidationContract.prototype.duplicateRegister = (value, code, message) => {
  if (value) {
    errors.push({ code, message })
  }
}

ValidationContract.prototype.isValidCpf = (value, code, message) => {
  if (!UTIL.isValidCpf(value)) {
    errors.push({ code, message })
  }
}

ValidationContract.prototype.isTrue = (value, code, message) => {
  if (value !== true) {
    errors.push({ code, message })
  }
}

ValidationContract.prototype.isDateValid = (value, code, message) => {
  if (!value) {
    errors.push({ code, message })
    return
  }

  const date = new Date(value)
  if (isNaN(date) && date.toString() === 'Invalid Date') {
    errors.push({ code, message })
  }
}

ValidationContract.prototype.containsInArray = (
  value,
  array,
  code,
  message
) => {
  if (!value || !array.includes(value)) {
    errors.push({ code, message })
  }
}

ValidationContract.prototype.errors = () => {
  return errors
}

ValidationContract.prototype.clear = () => {
  errors = []
}

ValidationContract.prototype.isValid = () => {
  return errors.length === 0
}

module.exports = ValidationContract
