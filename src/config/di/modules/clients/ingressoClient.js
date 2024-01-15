const { asClass } = require('awilix')

const IngressoClient = require('../../../../clients/ingresso/ingresso')
const IngressoGetDadosPagamento = require('../../../../clients/ingresso/getDadosPagamento')
const InscricoesPorCpf = require('../../../../clients/ingresso/inscricoesPorCpfRequest')
const InscricaoPorIdOrigin = require('../../../../clients/ingresso/inscricaoPorIdOrigin')
const PersonalData = require('../../../../clients/ingresso/personalDataRequest')
const PersonalDataUpdate = require('../../../../clients/ingresso/personalDataUpdate')
const ContratoAceite = require('../../../../clients/ingresso/contratoAceite')
const ContratoPorContratoId = require('../../../../clients/ingresso/contratoPorContratoId')
const ProvaIniciar = require('../../../../clients/ingresso/iniciarProva')
const ProvaFinalizar = require('../../../../clients/ingresso/finalizarProva')
const ProvaElegibilidade = require('../../../../clients/ingresso/elegibilidadeProva')
const ProvaConsulta = require('../../../../clients/ingresso/consultaProva')
const VerificadorToken = require('../../../../clients/ingresso/verificador/token')
const VerificadorTokenValidar = require('../../../../clients/ingresso/verificador/tokenValidar')
const Backbone = require('../../../../clients/ingresso/backbone')

module.exports = {
  IngressoGetDadosPagamento: asClass(IngressoGetDadosPagamento),
  IngressoClient: asClass(IngressoClient),
  InscricoesPorCpf: asClass(InscricoesPorCpf),
  InscricaoPorIdOrigin: asClass(InscricaoPorIdOrigin),
  PersonalData: asClass(PersonalData),
  PersonalDataUpdate: asClass(PersonalDataUpdate),
  ContratoAceite: asClass(ContratoAceite),
  ContratoPorContratoId: asClass(ContratoPorContratoId),
  ProvaIniciar: asClass(ProvaIniciar),
  ProvaFinalizar: asClass(ProvaFinalizar),
  ProvaElegibilidade: asClass(ProvaElegibilidade),
  ProvaConsulta: asClass(ProvaConsulta),
  VerificadorToken: asClass(VerificadorToken),
  VerificadorTokenValidar: asClass(VerificadorTokenValidar),
  Backbone: asClass(Backbone),
}
