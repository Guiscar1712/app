const config = require('../../utils/config')
const crypto = require('crypto')
const verificador = config.kroton.captacao

function encrypedCipher(data) {
  const dataStr = JSON.stringify(data)

  let cipher = crypto.createCipheriv(
    verificador.verificadorCipher,
    verificador.vericadorKey,
    verificador.verificadorKeyIV
  )

  let encrypted =
    cipher.update(dataStr, 'utf8', 'base64') + cipher.final('base64')
  return encrypted
}

module.exports = encrypedCipher
