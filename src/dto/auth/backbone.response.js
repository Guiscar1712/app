class BackboneRequest {
  constructor(data) {
    this.document = data.cpf
    this.birthday = new Date(data.dataNascimento)
    this.name = data.nome
    this.motherName = data.nomeMae
  }
}

module.exports = BackboneRequest
