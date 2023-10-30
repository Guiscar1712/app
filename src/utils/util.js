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

  static formatTelephone(telephone) {
    const numeroLimpo = telephone.replace(/\D/g, '')

    let numeroFormatado
    if (numeroLimpo.length === 10) {
      numeroFormatado = numeroLimpo.replace(
        /(\d{2})(\d{4})(\d{4})/,
        '($1) $2-$3'
      )
    } else if (numeroLimpo.length === 11) {
      numeroFormatado = numeroLimpo.replace(
        /(\d{2})(\d{5})(\d{4})/,
        '($1) $2-$3'
      )
    } else {
      throw new Error('Numero de telefone inválido')
    }

    return numeroFormatado
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
}
