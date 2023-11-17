const code = 'AUTH-2200'

const REQUIRED_USER_ID = { code: 2201, message: 'UserId é ob obrigatório' }
const REQUIRED_RECEIVER = { code: 2202, message: 'Receiver é obrigatório' } 

const DIVERGENT_REGISTRATION = { code: 2289, message: `Email não confere com CPF cadastrado.` }

const NOT_IMPLEMENTED_SOCIAL = { code: 2297, message: `Autenticação social não está disponível.` }
const NOT_IMPLEMENTED_EMAIL = { code: 2298, message: `Envio de EMAIL não está disponível.` }
const NOT_IMPLEMENTED_SMS = { code: 2299, message: `Envio de SMS não está disponível.` }

module.exports = {
  code,
  REQUIRED_USER_ID,
  REQUIRED_RECEIVER,
  DIVERGENT_REGISTRATION,
  NOT_IMPLEMENTED_EMAIL,
  NOT_IMPLEMENTED_SOCIAL,
  NOT_IMPLEMENTED_SMS,
}
