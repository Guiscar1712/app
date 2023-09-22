const { asClass } = require('awilix')

const IngressoClient = require('../../../../clients/ingresso/ingresso')
const IngressoGetDadosPagamento = require('../../../../clients/ingresso/getDadosPagamento')
const InscricaoPorIdOrigin = require('../../../../clients/ingresso/inscricaoPorIdOrigin')
const ContratoAceite = require('../../../../clients/ingresso/contratoAceite')

module.exports = {
  IngressoGetDadosPagamento: asClass(IngressoGetDadosPagamento).scoped(),
  IngressoClient: asClass(IngressoClient).scoped(),
  InscricaoPorIdOrigin: asClass(InscricaoPorIdOrigin).scoped(),
  ContratoAceite: asClass(ContratoAceite).scoped(),
}
