class PersonalData {
  constructor(data) {
    this.documentCpf = data.cpf
    this.name = data.nome
    this.gender = data.sexo
    this.birthdate = data.dataNascimento
    this.documentRg = data.rg
    this.documentRgIssuanceDate = data.rgDataEmissao
    this.documentRgdispatcher = data.rgOrgaoExpedidor
    this.fatherName = data.nomePai
    this.motherName = data.nomeMae
    this.placeOfbirth = data.naturalidade
    this.nationality = data.nacionalidade
    this.biologicalSex = data.sexoBiologico
    this.schoolConclusion = data.escolaConclusao
    this.yearCompletionOfHighSchool = data.anoConclusaoEnsinoMedio
    this.validatedDocuments = data.documentosValidados
    this.setEmails(data.emails)
    this.setTelephones(data.telefones)
    this.setAddresses(data.enderecos)
    this.setSpecialNeeds(data.necessidadesEspeciais)
    this.setCommunicationChannels(data.canalComunicacao)
    this.setResponsible(data.responsavel)
    this.setValidatedData(data.dadosValidados)
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
    this.telephones = []
    if (telephones) {
      telephones.forEach((element) => {
        this.telephones.push(new Telephone(element))
      })
    }
  }

  setAddresses(addresses) {
    this.addresses = []
    if (addresses) {
      addresses.forEach((element) => {
        this.addresses.push(new Address(element))
      })
    }
  }

  setSpecialNeeds(specialNeeds) {
    this.specialNeeds = []
    if (specialNeeds) {
      specialNeeds.forEach((element) => {
        this.specialNeeds.push(new SpecialNeed(element))
      })
    }
  }

  setCommunicationChannels(communicationChannels) {
    if (communicationChannels) {
      this.communicationChannels = new CommunicationChannel(
        communicationChannels
      )
    }
  }

  setResponsible(responsible) {
    if (responsible) {
      this.responsible = new Responsible(responsible)
    }
  }

  setValidatedData(validatedData) {
    if (validatedData) {
      this.validatedData = new ValidatedData(validatedData)
    }
  }
}

class Email {
  constructor(data) {
    this.email = data.email
    this.main = data.principal
  }
}

class Telephone {
  constructor(data) {
    this.type = data.tipo
    this.number = data.numero
    this.main = data.principal
  }
}

class Address {
  constructor(data) {
    this.type = data.tipo
    this.street = data.logradouro
    this.number = data.numero
    this.addressComplement = data.complemento
    this.neighborhood = data.bairro
    this.zipCode = data.cep
    this.city = data.municipio
    this.ibgeCode = data.codigoIbge
    this.stateAcronym = data.uf
    this.country = data.pais
    this.state = data.estado
  }
}

class SpecialNeed {
  constructor(data) {
    this.id = data.id
    this.description = data.descricao
    this.originId = data.idOrigem
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
    this.name = data.nome
    this.documentRg = data.rg
    this.documentRgIssuanceDate = data.rgDataEmissao
    this.documentRgdispatcher = data.rgOrgaoExpedidor
    this.documentCpf = data.cpf
    this.birthdate = data.dataNascimento
    this.relationship = data.relacao
    this.setResponsibleAddress(data.enderecoResponsavel)
    this.setCellPhone(data.celular)
    this.setEmail(data.email)
  }

  setResponsibleAddress(responsibleAddress) {
    this.responsibleAddress = new Address(responsibleAddress)
  }

  setCellPhone(cellPhone) {
    this.cellPhone = new Telephone(cellPhone)
  }

  setEmail(email) {
    this.email = new Email(email)
  }
}

class ValidatedData {
  constructor(data) {
    this.type = data.tipo
    this.ValidatedFields = data.camposValidados
  }
}

module.exports = PersonalData
