const util = require('util')

module.exports = class Util {
  static isNumber(char) {
    if (typeof char !== 'string') {
      return false
    }

    if (char.trim() === '') {
      return false
    }

    return !isNaN(char)
  }

  static getNumbers(text, limit) {
    if (!text) {
      return text
    }

    let r = ''
    for (let index = 0; index < text.length; index++) {
      const c = text[index]
      if (this.isNumber(c)) {
        r += c
      }
      if (limit && r.length >= limit) {
        break
      }
    }
    if (limit && r.length < limit) {
      r = r.padStart(limit, '0')
    }
    return r
  }

  static toNumber(value) {
    if (!isNaN(value)) {
      return parseInt(value)
    }
    return null
  }

  static formatPhone(phone) {
    phone = phone.replace(/\D/g, '')

    if (phone.length === 10) {
      return phone.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3')
    }

    if (phone.length === 11) {
      return phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
    }

    throw new Error('Número de telefone inválido')
  }

  static formatPhoneDDI(phone) {
    phone = phone.replace(/\D/g, '')

    if (phone.length !== 11) {
      return phone
    }

    return `55${phone}`
  }

  static formatCpf(cpf) {
    const cnpjCpf = cpf.replace(/\D/g, '')

    return cnpjCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '$1.$2.$3-$4')
  }

  static isEmpty(object) {
    return Object.keys(object).length === 0
  }

  static isNullOrEmpty(str) {
    return str === null || str === undefined || str.trim() === ''
  }

  static createSlug(inputString) {
    if (this.isNullOrEmpty(inputString)) {
      return ''
    }

    const stringWithHyphens = inputString.replace(/([a-z])([A-Z])/g, '$1-$2')
    const lowerCaseString = stringWithHyphens.toLowerCase()
    return lowerCaseString
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '-')
      .replace(/-+/g, '-')
      .trim()
  }

  static isValidCpf(cpf) {
    cpf = cpf.replace(/[^\d]+/g, '')
    if (cpf === '') return false

    if (
      cpf.length !== 11 ||
      cpf === '00000000000' ||
      cpf === '11111111111' ||
      cpf === '22222222222' ||
      cpf === '33333333333' ||
      cpf === '44444444444' ||
      cpf === '55555555555' ||
      cpf === '66666666666' ||
      cpf === '77777777777' ||
      cpf === '88888888888' ||
      cpf === '99999999999'
    ) {
      return false
    }

    let add = 0
    for (let index = 0; index < 9; index++) {
      add += parseInt(cpf.charAt(index)) * (10 - index)
    }

    let rev = 11 - (add % 11)
    if (rev === 10 || rev === 11) {
      rev = 0
    }
    if (rev !== parseInt(cpf.charAt(9))) {
      return false
    }

    add = 0
    for (let index = 0; index < 10; index++) {
      add += parseInt(cpf.charAt(index)) * (11 - index)
    }

    rev = 11 - (add % 11)
    if (rev === 10 || rev === 11) {
      rev = 0
    }
    if (rev !== parseInt(cpf.charAt(10))) {
      return false
    }
    return true
  }

  static obfuscateEmail(email) {
    const [user, provider] = email.split('@')
    const userLength = Math.floor(user.length / 3)
    const userOfuscado =
      user.slice(0, userLength) +
      '*'.repeat(userLength) +
      user.slice(userLength * 2, user.length)

    const providerLength = Math.floor(provider.length / 3)
    const providerOfuscado =
      provider.slice(0, providerLength) +
      '*'.repeat(providerLength) +
      provider.slice(providerLength * 2, provider.length)
    return `${userOfuscado}@${providerOfuscado}`
  }

  static obfuscatePhone(phone) {
    const phoneOfuscado = phone.slice(0, 4) + '*'.repeat(5) + phone.slice(9, 11)
    return phoneOfuscado
  }

  static stringFormat(text, value) {
    if (!text && !value) {
      return null
    }

    return util.format(text, value)
  }

  static sortNewest(list, fieldName) {
    list.sort(compareData)

    function compareData(a, b) {
      return new Date(b[fieldName]) - new Date(a[fieldName])
    }

    return list
  }

  static splitIP(address) {
    const chunk = address.split(':')
    const ip = chunk[0]
    return ip
  }

  static calculateLevenshteinDistance(str1, str2, ignoreCase) {
    if (!str1 || !str2) {
      return this.toNumber(process.env.AUTH_RECOVERY_DISTANCE) || 1
    }

    if (ignoreCase) {
      str1 = str1.toLowerCase()
      str2 = str2.toLowerCase()
    }

    const matriz = []

    for (let i = 0; i <= str1.length; i++) {
      matriz[i] = [i]
      for (let j = 0; j <= str2.length; j++) {
        if (i === 0) {
          matriz[i][j] = j
        } else {
          matriz[i][j] = 0
        }
      }
    }

    for (let i = 1; i <= str1.length; i++) {
      for (let j = 1; j <= str2.length; j++) {
        const custo = str1[i - 1] === str2[j - 1] ? 0 : 1
        matriz[i][j] = Math.min(
          matriz[i - 1][j] + 1,
          matriz[i][j - 1] + 1,
          matriz[i - 1][j - 1] + custo
        )
      }
    }

    return matriz[str1.length][str2.length]
  }

  static dateToString(data) {
    const day = String(data.getDate()).padStart(2, '0')
    const month = String(data.getMonth() + 1).padStart(2, '0')
    const year = data.getFullYear()

    return `${day}/${month}/${year}`
  }
}
