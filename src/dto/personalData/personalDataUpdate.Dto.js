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
    this.documentosValidados = data.validatedDocuments
    this.setEmails(data.emails)
    this.setTelephones(data.telephones)
    this.setAddresses(data.anddresses)
    this.setSpecialNeeds(data.specialNeeds)
    this.setCommunicationChannels(data.communicationChannels)
    this.setResponsible(data.responsible)
    // this.setValidatedData(data.ValidateData)
  }

  setEmails(emails) {
    this.emails = []
    if (emails) {
      emails.forEach((element) => {
        this.emails.push(new Email(element))
      })
    }
  }

  setTelephones(telephones) {
    this.telefones = []
    if (telephones) {
      telephones.forEach((element) => {
        this.telefones.push(new Telephone(element))
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

  setChannelCommunication(communicationChannels) {
    if (communicationChannels) {
      this.canalComunicacao = new CommunicationChannel(communicationChannels)
    }
  }

  setResponsible(responsible) {
    if (responsible) {
      this.reponsavel = new Responsible(responsible)
    }
  }

  setValidatedData(validatedData) {
    if (validatedData) {
      this.dadosValidados = new ValidatedData(validatedData)
    }
  }
}

class Email {
  constructor(data) {
    this.email = data.email
    this.principal = data.main
  }
}

class Telephone {
  constructor(data) {
    this.tipo = data.type
    this.numero = data.number
    this.principal = data.main
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
    this.celular = new Telephone(cellPhone)
  }

  setEmail(email) {
    this.email = new Email(email)
  }
}

// class ValidatedData {
//   constructor(data) {
//     this.tipo = data.type
//     this.camposValidados = data.ValidatedFields
//   }
// }

module.exports = PersonalData
