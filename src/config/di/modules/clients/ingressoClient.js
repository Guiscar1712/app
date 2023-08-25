const { asClass } = require('awilix')

const IngressoClient = require('../../../../clients/ingresso/ingresso')
const IngressoGetDadosPagamento = require('../../../../clients/ingresso/getDadosPagamento')

module.exports = {
  IngressoGetDadosPagamento: asClass(IngressoGetDadosPagamento).scoped(),
  IngressoClient: asClass(IngressoClient).scoped()
}
