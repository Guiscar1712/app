const axios = require('axios').create({ timeout: 1000000 })
const config = require('../../utils/config')
const ClientServerAuthError = require('../../utils/errors/ClientServerAuthError')
const ClientServerError = require('../../utils/errors/ClientServerError')
const getToken = require('./token')

const ingresso = {
  grant_type: 'client_credentials',
  client_id: config.kroton.ingresso.client_id,
  client_secret: config.kroton.ingresso.client_secret,
  base_uri: config.kroton.ingresso.url,
  OcpApimSubscriptionKey: config.kroton.ingresso.OcpApimSubscriptionKey,
}

const urlBase = ingresso.base_uri

module.exports = class Ingresso {
  constructor({
    LoggerService,
    IngressoGetDadosPagamento,
    InscricaoPorIdOrigin,
    PersonalData,
    PersonalDataUpdate,
    ContratoAceite,
    ContratoPorContratoId,
  }) {
    this.LoggerService = LoggerService
    this.IngressoGetDadosPagamento = IngressoGetDadosPagamento
    this.InscricaoPorIdOrigin = InscricaoPorIdOrigin
    this.ContratoAceite = ContratoAceite
    this.PersonalData = PersonalData
    this.PersonalDataUpdate = PersonalDataUpdate
    this.ContratoPorContratoId = ContratoPorContratoId
  }

  personalDataGet = async (cpf) => {
    return await this.PersonalData.request(cpf)
  }

  personalDataUpdate = async (body) => {
    return await this.PersonalDataUpdate.request(body)
  }

  getDadosPagamento = async (businessKey) => {
    return await this.IngressoGetDadosPagamento.request(businessKey)
  }

  inscricaoPorIdOrigin = async (idOrigin) => {
    return await this.InscricaoPorIdOrigin.request(idOrigin)
  }

  contratoAceite = async ({contractId, body}) => {
    return await this.ContratoAceite.request({ contractId, body })
  }

  contratoPorContratoId  = async ({contractId, body}) => {
    return await this.ContratoPorContratoId.request({ contractId, body })
  }
}
