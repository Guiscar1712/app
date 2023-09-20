const { asClass } = require('awilix')

const IngressoClient = require('../../../../clients/ingresso/ingresso')
const IngressoGetDadosPagamento = require('../../../../clients/ingresso/getDadosPagamento')
const InscricaoPorIdOrigin = require('../../../../clients/ingresso/inscricaoPorIdOrigin')

module.exports = {
  IngressoGetDadosPagamento: asClass(IngressoGetDadosPagamento).scoped(),
  IngressoClient: asClass(IngressoClient).scoped(),
  InscricaoPorIdOrigin: asClass(InscricaoPorIdOrigin).scoped(),
}
