const code = 'AUTH-2200'

const DIVERGENT_REGISTRATION = { code: 2298, message: `Email não confere com CPF cadastrado.` }
const NOT_IMPLEMENTED_SMS = { code: 2299, message: `Envio de SMS não está disponível.` }

module.exports = {
  code,
  NOT_IMPLEMENTED_SMS,
  DIVERGENT_REGISTRATION
}
