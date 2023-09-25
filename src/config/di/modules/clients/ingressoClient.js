const { asClass } = require('awilix')

const IngressoClient = require('../../../../clients/ingresso/ingresso')
const IngressoGetDadosPagamento = require('../../../../clients/ingresso/getDadosPagamento')
const InscricaoPorIdOrigin = require('../../../../clients/ingresso/inscricaoPorIdOrigin')
const PersonalData = require('../../../../clients/ingresso/personalDataRequest')
const PersonalDataUpdate = require('../../../../clients/ingresso/personalDataUpdate')
const ContratoAceite = require('../../../../clients/ingresso/contratoAceite')
const ContratoPorContratoId = require('../../../../clients/ingresso/contratoPorContratoId')

module.exports = {
  IngressoGetDadosPagamento: asClass(IngressoGetDadosPagamento).scoped(),
  IngressoClient: asClass(IngressoClient).scoped(),
  InscricaoPorIdOrigin: asClass(InscricaoPorIdOrigin).scoped(),
  PersonalData: asClass(PersonalData).scoped(),
  PersonalDataUpdate: asClass(PersonalDataUpdate).scoped(),
  ContratoAceite: asClass(ContratoAceite).scoped(),
  ContratoPorContratoId: asClass(ContratoPorContratoId).scoped(),
}
