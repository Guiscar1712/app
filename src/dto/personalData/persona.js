class PersonalData {
  constructor (data) {
    this.cpf = data.cpf
    this.nome = data.nome
    this.sexo = data.sexo
    this.rg = data.rg
    this.dataNascimento = data.dataNascimento
    this.rgDataEmissao = data.rgDataEmissao
    this.rgOrgaoExpedidor = data.rgOrgaoExpedidor
    this.nomePai = data.nomePai
    this.nomeMae = data.nomeMae
    this.naturalidade = data.naturalidade
    this.nacionalidade = data.nacionalidade
    this.sexoBiologico = data.sexoBiologico
    this.escolaConclusao = data.escolaConclusao
    this.anoConclusaoEnsinoMedio = data.anoConclusaoEnsinoMedio
    this.documentosValidados = data.documentosValidados
    this.setEmails(data.emails)
    this.setTelefones(data.telefones)
    this.setEnderecos(data.enderecos)
    this.setNecessidadesEspeciais(data.necessidadesEspeciais)
    this.setCanalComunicacao(data.canalComunicacao)
    this.setResponsavel(data.responsavel)
    this.setDadosValidados(data.dadosValidados)
  }

  setEmails (emails) {
    this.emails = []
    if (emails) {
      emails.forEach(element => {
        this.emails.push(new Email(element))
      })
    }
  }

  setTelefones (telefones) {
    this.telefones = []
    if (telefones) {
      telefones.forEach(element => {
        this.telefones.push(new Telefone(element))
      })
    }
  }

  setEnderecos (enderecos) {
    this.enderecos = []
    if (enderecos) {
      enderecos.forEach(element => {
        this.enderecos.push(new Endereco(element))
      })
    }
  }

  setNecessidadesEspeciais (necessidadesEspeciais) {
    this.necessidadesEspeciais = []
    if (necessidadesEspeciais) {
      necessidadesEspeciais.forEach(element => {
        this.necessidadesEspeciais.push(new NecessidadesEspeciais(element))
      })
    }
  }

  setCanalComunicacao (canalComunicacao) {
    if (canalComunicacao) {
      this.necessidadesEspeciais = new CanalComunicacao(canalComunicacao)
    }
  }

  setResponsavel (responsavel) {
    if (responsavel) {
      this.reponsavel = new Responsavel(responsavel)
    }
  }

  setDadosValidados (dadosValidados) {
    if (dadosValidados) {
      this.dadosValidados = new DadosValidados(dadosValidados)
    }
  }
}

class Email {
  constructor (data) {
    this.email = data.email
    this.principal = data.principal
  }
}

class Telefone {
  constructor (data) {
    this.tipo = data.tipo
    this.numero = data.numero
    this.principal = data.principal
  }
}

class Endereco {
  constructor (data) {
    this.tipo = data.tipo
    this.logradouro = data.logradouro
    this.numero = data.numero
    this.complemento = data.complemento
    this.bairro = data.bairro
    this.cep = data.cep
    this.municipio = data.municipio
    this.codigoIbge = data.codigoIbge
    this.uf = data.uf
    this.pais = data.pais
    this.estado = data.estado
  }
}

class NecessidadesEspeciais {
  constructor (data) {
    this.id = data.id
    this.descricao = data.descricao
    this.idOrigem = data.idOrigem
  }
}

class CanalComunicacao {
  constructor (data) {
    this.email = data.email
    this.sms = data.sms
    this.whatsApp = data.whatsApp
  }
}

class Responsavel {
  constructor (data) {
    this.nome = data.nome
    this.rg = data.rg
    this.rgDataEmissao = data.rgDataEmissao
    this.rgOrgaoExpedidor = data.rgOrgaoExpedidor
    this.cpf = data.cpf
    this.dataNascimento = data.dataNascimento
    this.relacao = data.relacao
    this.setEnderecoResponsavel(data.enderecoResponsavel)
    this.setCelular(data.celular)
    this.setEmail(data.email)
  }

  setEnderecoResponsavel (enderecoResponsavel) {
    this.enderecoResponsavel = new Endereco(enderecoResponsavel)
  }

  setCelular (celular) {
    this.celular = new Telefone(celular)
  }

  setEmail (email) {
    this.email = new Email(email)
  }
}

class DadosValidados {
  constructor (data) {
    this.tipo = data.tipo
    this.camposValidados = data.camposValidados
  }
}

module.exports = PersonalData
