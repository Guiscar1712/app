class EnrollmentDto {
  constructor (data) {
    const { inscricao, matricula, dadosPessoais, processamento } = data

    if (processamento?.status !== 'SUCCESS') {
      this.status = 'ERROR'
      return
    }

    const { enem, classificacao, ofertas, contrato } = inscricao

    const course = ofertas.primeiraOpcao
    if (!course) {
      this.status = 'ERROR'
      return
    }

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

    this.setClassification(classificacao)
  }

  setClassification (classificacao) {
    const enrollment = ['Aluno']
    const registered = ['Inscrito', 'Inscrito VG Online', 'Convocado']
    const disqualified = ['Desclassificado', 'Desclassificado por nota']

    if (enrollment.includes(classificacao.descricao)) {
      this.classification = 'STUDENT'
    } else if (registered.includes(classificacao.descricao)) {
      this.classification = 'ENROLLMENT'
    } else if (disqualified.includes(classificacao.descricao)) {
      this.classification = 'DISQUALIFIED'
    } else {
      this.classification = 'ABSENT'
    }
  }

  setCourseName (courseName) {
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
  constructor (enem, classificacao) {
    this.active = enem.utilizar
    this.setApprovedEnem(classificacao)
  }

  setApprovedEnem (classificacao) {
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
  constructor (contrato) {
    this.setContract(contrato)
  }

  setContract (contrato) {
    // Redirecionar para pagamento? Pagamento Pendente/
    if (!contrato) {
      this.available = false
      this.accepted = false
    }

    // Redirecionar para Contratos Pendentes
    if (contrato === 'AGUARDANDO_ACEITE') {
      this.available = true
      this.accepted = false
    }

    // Redirecionar para pagamento? Pagamento Pendente/
    if (contrato === 'ACEITO') {
      this.available = true
      this.accepted = true
    }
  }
}

class EnrollmentStudentDto {
  constructor (matricula, dadosPessoais) {
    this.studentCode = matricula?.ra

    this.studentName = dadosPessoais?.nome
    this.studentEmail = dadosPessoais?.email
    this.studentDocument = dadosPessoais?.cpf

    this.setPayment(matricula)
    this.setActiveEnrollment()
  }

  // quando false consultar status pagamento
  setPayment (matricula) {
    this.payment = !!matricula?.pagamento?.pago
    // payment to this.paid = !!matricula?.pagamento?.pago
  }

  setActiveEnrollment () {
    this.active = !!this.studentCode
  }
}

module.exports = EnrollmentDto
