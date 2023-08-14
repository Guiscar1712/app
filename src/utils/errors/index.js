const AuthError = require('./AuthError')
const ServerError = require('./ServerError')
const RepositoryError = require('./RepositoryError')
const ValidationError = require('./ValidationError')
const NotFoundError = require('./NotFoundError')
const ClientServerError = require('./ClientServerError')
const ClientServerAuthError = require('./ClientServerAuthError')

module.exports = {
  AuthError,
  ServerError,
  RepositoryError,
  ValidationError,
  NotFoundError,
  ClientServerError,
  ClientServerAuthError
}
