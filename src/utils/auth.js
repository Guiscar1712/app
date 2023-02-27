const bcrypt = require('bcrypt')
const SALT_ROUNDS = 10

/**
 * Gera o hash da senha a ser gravada no banco
 * @param {String} plainPassword Senha a ser criptografada
 * @returns {String} Hash da senha
 */
const encryptPassword = (plainPassword) => bcrypt.hashSync(plainPassword, SALT_ROUNDS)

/**
 * Compara a senha informada com o hash
 * @param {String} plainPassword Senha não criptografada
 * @param {String} hash Hash da senha
 * @returns {Boolean} True caso sejam iguais e False caso contrário
 */
const comparePassword = (plainPassword, hash) => bcrypt.compareSync(plainPassword, hash)

/**
 * Gera um numero randomico de 6 digitos
 * @returns Numero de 6 digitos
 */
const getRecoverKey = async () => Math.floor(10000 + Math.random() * 90000)

module.exports = {
  encryptPassword,
  comparePassword,
  getRecoverKey
}
