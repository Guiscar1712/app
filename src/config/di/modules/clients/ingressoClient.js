const { asClass } = require('awilix')

const IngressoClient = require('../../../../clients/ingresso/ingresso')
const IngressoGetDadosPagamento = require('../../../../clients/ingresso/getDadosPagamento')
const InscricaoPorIdOrigin = require('../../../../clients/ingresso/inscricaoPorIdOrigin')
const PersonalData = require('../../../../clients/ingresso/personalDataRequest')
const PersonalDataUpdate = require('../../../../clients/ingresso/personalDataUpdate')
const ContratoAceite = require('../../../../clients/ingresso/contratoAceite')
const ContratoPorContratoId = require('../../../../clients/ingresso/contratoPorContratoId')
const ProvaIniciar = require('../../../../clients/ingresso/iniciarProva')

module.exports = {
  IngressoGetDadosPagamento: asClass(IngressoGetDadosPagamento),
  IngressoClient: asClass(IngressoClient),
  InscricaoPorIdOrigin: asClass(InscricaoPorIdOrigin),
  PersonalData: asClass(PersonalData),
  PersonalDataUpdate: asClass(PersonalDataUpdate),
  ContratoAceite: asClass(ContratoAceite),
  ContratoPorContratoId: asClass(ContratoPorContratoId),
  ProvaIniciar: asClass(ProvaIniciar),
}
