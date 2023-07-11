const moment = require('moment')
const { ingressoClient, cognaPay } = require('../../clients')
const paymentRepository = require('../../repositories/PaymentRepository')
const PaymentPixResponse = require('../../dto/payment/PaymentPixResponse.Dto')
const PaymentPixRequest = require('../../dto/payment/PaymentPixRequest.Dto')

async function paymentForPix (originId, userId) {
  try {
    // Consultar Status Pagamento
    // Se status = false: gerarnova chave Pix
    // Se status = true/Paid ????

    const enrollment = await ingressoClient.inscricaoPorIdOrigin(originId)
    const order = await ingressoClient.consultaDadosPagamento(enrollment.inscricao.businessKey)

    // const payDto = new PaymentPixRequest(getMok())
    const payDto = new PaymentPixRequest(order)

    const origin = enrollment.sistema.toUpperCase()
    const data = await cognaPay.payForPix(payDto, origin)

    if (!data.error) {
      // await save(payDto, userId, subscription)

      const res = new PaymentPixResponse(data.qrCode, data.qrCodeUrl, payDto.preDefinedOptions.Pix.ExpireAtDateTime, payDto.totalAmount)

      return res
    }
  } catch (error) {
    throw new Error(error)
  }
}

function getMok () {
  const teste = moment().valueOf().toString()
  return {
    recurrenceReference: '',
    issueDate: '2023-04-17T12:54:38',
    referenceDate: '2023-05-02T15:01:05.058Z',
    lateInterestValueAbsolute: 0,
    originalDueDate: '2023-05-02T15:01:05.058Z',
    fineValue: 0,
    fineValuePercentage: 0,
    lateInterestValue: 0,
    lateInterestValuePercentage: 0,
    dueDate: '2023-05-02T15:01:05.058Z',
    dueDateInformative: '2023-05-02T15:01:05.058Z',
    remarks: 'Este boleto é válido até o vencimento. Após, atualizar no Portal.\nEste boleto não quita débitos anteriores\nSr. Caixa: Não receber em Cheque.',
    redirectUrl: null,
    adjustLayoutToIFrame: true,
    preDefinedOptions: {
      creditCard: {
        installments: 1
      },
      billet: {
        directBillet: false,
        expireBillTicketInDays: 1
      }
    },
    linkCheckout: {
      emailNotification: 'heitor.fernandes@bluecore.it',
      smsNotification: '(67) 99887-8998',
      sendCheckoutNotification: true,
      expirationInDays: 0,
      challenge: {
        question: '',
        answer: '',
        useCaptcha: true
      }
    },
    fundingOptions: {
      creditCard: {
        installments: 1
      }
    },
    orderReference: '104-' + teste,
    invoiceType: 'PreMatricula',
    charges: [
      {
        chargeReference: teste,
        description: 'Mensalidade de Abril de 2023',
        course: {
          courseReference: '044',
          name: 'ADMINISTRAÇÃO - N'
        },
        items: [
          {
            itemReference: teste,
            lineNumber: 1,
            product: 'Mensalidade',
            description: 'Mensalidade de Abril de 2023',
            unitPrice: 9.9,
            quantity: 1,
            totalPrice: 9.9,
            remarks: '',
            groupDefinition: {
              key: '-',
              order: 0,
              description: 'Mensalidade',
              sign: '(-)'
            },
            issueDate: '2023-04-17T12:54:38'
          }
        ]
      }
    ],
    totalAmount: 9.9,
    discount: {
      amount: 0.0,
      limitDate: '2023-05-02T15:01:05.058Z'
    },
    student: {
      studentReference: '12340014',
      cpf: '81032254017',
      ra: '35963409',
      subscription: '12340014',
      name: 'HEITOR NETO',
      email: 'heitor.fernandes@bluecore.it',
      address: {
        street: 'RUA MARECHAL RONDON',
        number: '234',
        complement: '',
        city: 'CAMPO GRANDE',
        state: 'MS',
        zip: '79002-200',
        country: 'Brasil',
        neighborhood: 'CENTRO'
      },
      alternativeAddress: {
        street: 'RUA MARECHAL RONDON',
        number: '234',
        complement: '',
        city: 'CAMPO GRANDE',
        state: 'MS',
        zip: '79002-200',
        country: 'Brasil',
        neighborhood: 'CENTRO'
      }
    },
    krotonBrand: 'ANHANGUERA',
    school: {
      name: 'CAMPO GRANDE/MS - MATRIZ - 7484667',
      cnpj: '04310392000146',
      address: {
        street: 'RUA CEARA, 333, MIGUEL COUTO - CAMPO GRANDE - MS',
        number: '333',
        complement: '',
        city: 'CAMPO GRANDE',
        state: 'MS',
        zip: '79003-010',
        country: 'Brasil',
        neighborhood: 'MIGUEL COUTO - CAMPO GRANDE - MS'
      }
    }
  }
}

async function save (payDto, userId, subscription) {
  let paymentData = await paymentRepository.findBy({ orderReference: payDto.OrderReference })
  if (!paymentData) {
    paymentData = {
      userId,
      paymentId: payDto.PaymentId,
      subscriptionKey: subscription.inscricao.businessKey,
      totalAmount: payDto.TotalAmount,
      origin: payDto.Origin,
      itemReference: payDto.Charges[0].ChargeReference,
      orderReference: payDto.OrderReference,
      studentReference: payDto.Student.RA,
      document: payDto.Student.CPF,
      typeOfPayment: 'PIX',
      paymentStatus: 'Generated'
    }

    await paymentRepository.insert(paymentData)
  }
}

module.exports = paymentForPix
