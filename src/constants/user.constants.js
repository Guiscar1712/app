const CODE = 'USER-100'
const REQUIRED_EMAIL = { CODE: 101, MESSAGE: 'Email é obrigatório' }
const REQUIRED_PASSWORD = { CODE: 102, MESSAGE: 'Senha é obrigatória' }
const REQUIRED_TOKEN_FIREBASE = {
  CODE: 103,
  MESSAGE: 'Token firebase é obrigatório',
}
const REQUIRED_CPF = { CODE: 104, MESSAGE: 'CPF é obrigatório' }
const REQUIRED_NAME = { CODE: 105, MESSAGE: 'Nome é obrigatório' }

const INVALID_EMAIL = { CODE: 106, MESSAGE: 'E-mail inválido' }
const INVALID_PASSWORD = { CODE: 107, MESSAGE: 'Senha inválida' }
const INVALID_CPF = { CODE: 108, MESSAGE: 'CPF inválido' }

const REGISTERED_EMAIL = { CODE: 109, MESSAGE: 'E-mail já esta cadastrado' }
const REGISTERED_CPF = { CODE: 110, MESSAGE: 'CPF já esta cadastrado' }
const REGISTERED_CELLPHONE = {
  CODE: 111,
  MESSAGE: 'Celular já esta cadastrado',
}

//const NOT_REGISTER_EMAIL = { CODE: 112, MESSAGE: 'E-mail não cadastrado' }
const NOT_REGISTER_EMAIL = {
  CODE: 112,
  MESSAGE:
    'O email que você inseriu não está cadastrado no nosso APP. Crie uma nova conta do zero, e comece a aproveitar!',
}

const NOT_REGISTER_CPF = {
  CODE: 113,
  MESSAGE: 'CPF não esta cadastrado!',
}

module.exports = {
  CODE,
  REQUIRED_EMAIL,
  REQUIRED_PASSWORD,
  REQUIRED_TOKEN_FIREBASE,
  REQUIRED_CPF,
  REQUIRED_NAME,
  INVALID_EMAIL,
  INVALID_PASSWORD,
  INVALID_CPF,
  REGISTERED_EMAIL,
  REGISTERED_CPF,
  REGISTERED_CELLPHONE,
  NOT_REGISTER_EMAIL,
  NOT_REGISTER_CPF,
}
