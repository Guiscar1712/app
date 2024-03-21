const { EnrollmentsHelpers } = require('../../helpers')
class EnrollmentDto {
  constructor(data) {
    const classification = EnrollmentsHelpers.getClassification(data)
    if (classification == 'ERROR') {
      this.status = 'ERROR'
      return
    }

    this.classification = classification

    const { sistema, inscricao, matricula, dadosPessoais } = data
    const { enem, classificacao, ofertas, contrato } = inscricao
    const course = ofertas.primeiraOpcao

    this.idOrigin = inscricao.idOrigem
    this.businessKey = inscricao.businessKey
    this.enrollmentDate = inscricao.dataInscricao

    this.enem = new EnrollmentEnemDto(enem, classificacao)

    this.courseTypeName = course.dsTipoCurso
    this.unit = course.dsUnidade
    this.modality = course.dsModalidade
    this.shift = course.dsTurno
    this.monthlyPayment = course.vlMensalidadePara
    this.setCourseName(course.dsCurso)

    this.studentEnrollment = new EnrollmentStudentDto(matricula, dadosPessoais)
    this.contract = new EnrollmentContractDto(contrato)
    this.setPaymentConfig(sistema)
  }

  setPaymentConfig(system) {
    system = system.toUpperCase()

    let isEnabled = false

    if (system === 'COLABORAR' && process.env.COLABORAR_PAYMENT_PIX_ENABLED) {
      isEnabled = process.env.COLABORAR_PAYMENT_PIX_ENABLED === 'true'
    } else if (system === 'OLIMPO' && process.env.OLIMPO_PAYMENT_PIX_ENABLED) {
      isEnabled = process.env.OLIMPO_PAYMENT_PIX_ENABLED === 'true'
    } else if (
      (system === 'SAP' || system === 'ATHENAS') &&
      process.env.ATHENAS_PAYMENT_PIX_ENABLED
    ) {
      isEnabled = process.env.ATHENAS_PAYMENT_PIX_ENABLED === 'true'
    }

    this.paymentConfig = {
      pix: {
        enabled: isEnabled,
      },
    }
  }

  setCourseName(courseName) {
    if (!courseName) {
      this.courseName = ''
    }

    const courseNameSplit = courseName.split(' - ')

    if (courseNameSplit.length <= 1) {
      this.courseName = ''
    }

    courseNameSplit.splice(courseNameSplit.length - 1, 1)

    this.courseName = courseNameSplit.join(' - ')
  }
}

class EnrollmentEnemDto {
  constructor(enem, classificacao) {
    this.active = enem.utilizar
    this.setApprovedEnem(classificacao)
  }

  setApprovedEnem(classificacao) {
    const approved = ['Convocado', 'Aluno']
    if (this.active && approved.includes(classificacao.descricao)) {
      this.approved = true
    } else {
      this.approved = false
    }
  }
}

class EnrollmentContractDto {
  available
  accepted
  constructor(contrato) {
    this.setContract(contrato)
  }

  setContract(contrato) {
    // Redirecionar para pagamento? Pagamento Pendente/
    if (!contrato || contrato.status === 'NAO_GERADO') {
      this.incomplete = null
      this.incompleteLink = null
      this.available = false
      this.accepted = false
      return
    }

    // Redirecionar para Contratos Incompleto
    const cadastroImcompleto = ['CADASTRO_INCOMPLETO']
    if (cadastroImcompleto.includes(contrato.status)) {
      this.incomplete = true
      this.incompleteLink = contrato.link
      this.available = null
      this.accepted = null
      return
    }

    // Redirecionar para Contratos Pendentes
    const aguardandoAceite = ['AGUARDANDO_ACEITE']
    if (aguardandoAceite.includes(contrato.status)) {
      this.incomplete = null
      this.incompleteLink = null
      this.available = true
      this.accepted = false
      return
    }

    // Redirecionar para pagamento? Pagamento Pendente/
    if (contrato.status === 'ACEITO') {
      this.incomplete = null
      this.incompleteLink = null
      this.available = true
      this.accepted = true
    }
  }
}

class EnrollmentStudentDto {
  constructor(matricula, dadosPessoais) {
    this.enrollmentId = matricula?.id
    this.studentCode = matricula?.ra

    this.studentName = dadosPessoais?.nome
    this.studentEmail = dadosPessoais?.email
    this.studentDocument = dadosPessoais?.cpf

    this.setPayment(matricula)
    this.setActiveEnrollment()
  }

  // quando false consultar status pagamento
  setPayment(matricula) {
    this.payment = !!matricula?.pagamento?.pago
    // payment to this.paid = !!matricula?.pagamento?.pago
  }

  setActiveEnrollment() {
    this.active = !!this.studentCode
  }
}

module.exports = EnrollmentDto
