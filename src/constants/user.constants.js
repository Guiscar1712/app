const code = 'USER-1100'
const REQUIRED_EMAIL = { code: 1101, message: 'Email é obrigatório' }
const REQUIRED_PASSWORD = { code: 1102, message: 'Senha é obrigatória' }
const REQUIRED_TOKEN_FIREBASE = {
  code: 1103,
  message: 'Token firebase é obrigatório',
}
const REQUIRED_CPF = { code: 1104, message: 'CPF é obrigatório' }
const REQUIRED_NAME = { code: 1105, message: 'Nome é obrigatório' }

const INVALID_EMAIL = { code: 1106, message: 'E-mail inválido' }
const INVALID_PASSWORD = { code: 1107, message: 'Senha inválida' }
const INVALID_CPF = { code: 1108, message: 'CPF inválido' }

const REGISTERED_EMAIL = { code: 1109, message: 'E-mail já esta cadastrado' }
const REGISTERED_CPF = { code: 1110, message: 'CPF já esta cadastrado' }
const REGISTERED_CELLPHONE = {
  code: 1111,
  message: 'Celular já esta cadastrado',
}

//const NOT_REGISTER_EMAIL = { code: 112, message: 'E-mail não cadastrado' }
const NOT_REGISTER_EMAIL = {
  code: 1112,
  message:
    'O email que você inseriu não está cadastrado no nosso APP. Crie uma nova conta do zero, e comece a aproveitar!',
}

const NOT_REGISTER_CPF = {
  code: 1113,
  message: 'CPF não esta cadastrado!',
}

const NOT_FOUND = {
  code: 1114,
  message: 'Usuário não encontrado!',
}
const REQUIRED_CELLPHONE = { code: 1115, message: 'Telefone é obrigatório' }

module.exports = {
  code,
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
  NOT_FOUND,
  REQUIRED_CELLPHONE,
}
