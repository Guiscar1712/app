module.exports = class Util {
  static isNumber (char) {
    if (typeof char !== 'string') {
      return false
    }

    if (char.trim() === '') {
      return false
    }

    return !isNaN(char)
  }

  static getNumbers (text, limit) {
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

  static toNumber (value) {
    if (!isNaN(value)) {
      return parseInt(value)
    }
    return null
  }

  static formatCpf (cpf) {
    const cnpjCpf = cpf.replace(/\D/g, '')

    return cnpjCpf.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/g, '\$1.\$2.\$3-\$4')
  }

  static isEmpty (object) {
    return Object.keys(object).length === 0
  }

  static isNullOrEmpty (str) {
    return str === null || str === undefined || str.trim() === ''
  }

  static createSlug (inputString) {
    if (this.isNullOrEmpty(inputString)) {
      return ''
    }

    const stringWithHyphens = inputString.replace(/([a-z])([A-Z])/g, '$1-$2')
    const lowerCaseString = stringWithHyphens.toLowerCase()
    return lowerCaseString
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
      .replace(/-+/g, '-')
      .trim()
  }
}
