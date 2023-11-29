const CODE = 'AUTH-2200'

const REQUIRED_USER_ID = { code: 2201, message: 'UserId é obrigatório' }
const REQUIRED_RECEIVER = { code: 2202, message: 'Receiver é obrigatório' }
const REQUIRED_PROVIDER = { code: 2203, message: 'Provider é obrigatório' }
const REQUIRED_KEY = { code: 2204, message: 'Key é obrigatória' }
const INVALID_KEY = { code: 2205, message: 'Key de Verificação é inválido.' }

const DIVERGENT_REGISTRATION = {
  code: 2289,
  message: 'Email não confere com CPF cadastrado.',
}

const NOT_IMPLEMENTED_PROVIDER = {
  code: 2299,
  message: 'Provider está disponível.',
}

module.exports = {
  CODE,
  REQUIRED_USER_ID,
  REQUIRED_RECEIVER,
  REQUIRED_PROVIDER,
  REQUIRED_KEY,
  INVALID_KEY,
  DIVERGENT_REGISTRATION,
  NOT_IMPLEMENTED_PROVIDER,
}
