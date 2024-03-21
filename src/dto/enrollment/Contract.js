class Contract {
  constructor (data) {
    if (!data || !data.id || !data.nome) {
      this.status = 'ERROR'
      return
    }

    this.id = data.id
    this.name = data.nome
    this.setAccepted(data.dadosAceite)
  }

  setAccepted (data) {
    console.log(data)
    if (!data || !data.opcao) {
      this.accepted = false
      return
    }

    switch (data.opcao) {
      case 1:
        this.accepted = true
        break
      default:
        this.accepted = false
        break
    }
  }
}

module.exports = Contract
