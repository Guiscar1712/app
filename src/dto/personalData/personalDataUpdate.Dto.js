const Util = require('./../../utils/util')
class PersonalData {
  constructor(data) {
    this.cpf = data.documentCpf
    this.nome = data.name
    this.sexo = data.gender
    this.dataNascimento = data.birthdate
    this.rg = data.documentRg
    this.rgDataEmissao = data.documentRgIssuanceDate
    this.rgOrgaoExpedidor = data.documentRgDispatcher
    this.nomePai = data.fatherName
    this.nomeMae = data.motherName
    this.naturalidade = data.placeOfbirth
    this.nacionalidade = data.nationality
    this.sexoBiologico = data.biologicalSex
    this.escolaConclusao = data.schoolConclusion
    this.anoConclusaoEnsinoMedio = data.yearCompletionOfHighSchool
    this.setEmails(data.emails)
    this.setPhones(data.telephones)
    this.setAddresses(data.addresses)
    this.setSpecialNeeds(data.specialNeeds)
    this.setCommunicationChannels(data.communicationChannels)
    this.setResponsible(data.responsible)
  }

  setEmails(emails) {
    this.emails = []
    if (emails) {
      emails.forEach((element) => {
        this.emails.push(new Email(element))
      })
    }
  }

  setPhones(phones) {
    this.telefones = []
    if (phones) {
      phones.forEach((element) => {
        this.telefones.push(new Phone(element))
      })
    }
  }

  setAddresses(addresses) {
    this.enderecos = []
    if (addresses) {
      addresses.forEach((element) => {
        this.enderecos.push(new Address(element))
      })
    }
  }

  setSpecialNeeds(specialNeeds) {
    this.necessidadesEspeciais = []
    if (specialNeeds) {
      specialNeeds.forEach((element) => {
        this.necessidadesEspeciais.push(new SpecialNeed(element))
      })
    }
  }

  setCommunicationChannels(communicationChannels) {
    if (communicationChannels) {
      this.canalComunicacao = new CommunicationChannel(communicationChannels)
    }
  }

  setResponsible(responsible) {
    if (responsible) {
      this.reponsavel = new Responsible(responsible)
    }
  }
}

class Email {
  constructor(data) {
    this.email = data.email
    this.principal = data.main
  }
}

class Phone {
  constructor(data) {
    this.principal = data.main
    this.setNumber(data.number)
    this.setType()
  }

  setNumber = (number) => {
    this.numero = Util.formatPhone(number)
  }

  setType = () => {
    this.tipo = this.numero.length === 15 ? 'MOVEL' : 'FIXO'
  }
}

class Address {
  constructor(data) {
    this.tipo = data.type
    this.logradouro = data.street
    this.numero = data.number
    this.complemento = data.addressComplement
    this.bairro = data.neighborhood
    this.cep = data.zipCode
    this.municipio = data.city
    this.codigoIbge = data.ibgeCode
    this.uf = data.stateAcronym
    this.pais = data.country
    this.estado = data.state
  }
}

class SpecialNeed {
  constructor(data) {
    this.id = data.id
    this.descricao = data.description
    this.idOrigem = data.originId
  }
}

class CommunicationChannel {
  constructor(data) {
    this.email = data.email
    this.sms = data.sms
    this.whatsApp = data.whatsApp
  }
}

class Responsible {
  constructor(data) {
    this.nome = data.name
    this.rg = data.documentRg
    this.rgDataEmissao = data.documentRgIssuanceDate
    this.rgOrgaoExpedidor = data.documentRgDispatcher
    this.cpf = data.documentCpf
    this.dataNascimento = data.birthdate
    this.relacao = data.relationship
    this.setResponsibleAddress(data.responsibleAddress)
    this.setCellPhone(data.cellPhone)
    this.setEmail(data.email)
  }

  setResponsibleAddress(responsibleAddress) {
    this.enderecoResponsavel = new Address(responsibleAddress)
  }

  setCellPhone(cellPhone) {
    this.celular = new Phone(cellPhone)
  }

  setEmail(email) {
    this.email = new Email(email)
  }
}

module.exports = PersonalData
