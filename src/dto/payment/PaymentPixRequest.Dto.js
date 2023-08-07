const moment = require('moment')
const PaymentRequest = require('./PaymentRequest.Dto')

const expiresInMinutes = process.env.KROTON_INGRESSO_PAYMENT_PIX_EXPIRESDATE || 5

class PaymentPixRequest extends PaymentRequest {
  constructor (data) {
    super(data)
    this.preDefinedOptions = this.setPreDefinedOptions(data)
  }

  setPreDefinedOptions () {
    const dateNow = moment()
    const expiresDate = dateNow.add(expiresInMinutes, 'minutes')
    return {
      pix: {
        directPix: true,
        expireAtDateTime: expiresDate
      },
      usePaymentTypes: ['Pix']
    }
  }
}
module.exports = PaymentPixRequest
/*
const Logger = require('../../utils/logger.util')
const res = new PaymentPixRequest(getMok())
if (!res.isValid()) {
  const errors = res.errors()
  Logger.error(JSON.stringify(errors))
}

function getMok () {
  return {
    recurrenceReference: '',
    issueDate: '2023-07-19T00:00:00Z',
    referenceDate: '2023-07-31',
    lateInterestValueAbsolute: 0,
    originalDueDate: '2023-07-25T00:00:00Z',
    fineValue: 0,
    fineValuePercentage: 0,
    lateInterestValue: 0,
    lateInterestValuePercentage: 0,
    dueDate: '2023-07-25T00:00:00Z',
    dueDateInformative: '2023-07-21T10:45:03Z',
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
      emailNotification: 'heitor.fernandes@bluecore.com.br',
      smsNotification: '(67) 98765-6897',
      sendCheckoutNotification: false,
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
    orderReference: 'U-8T07F6QLK9ZDPDM2U4Q',
    invoiceType: 'PreMatricula',
    charges: [
      {
        chargeReference: '8T07F6QLK9ZDPDM2U4Q',
        description: 'Mensalidade de Julho de 2023',
        course: {
          courseReference: 'ADM',
          name: 'ADMINISTRACAO'
        },
        items: [
          {
            itemReference: '800012615511SAP',
            lineNumber: 1,
            product: 'Mensalidade',
            description: 'Cotação - Mensalidade',
            unitPrice: 59.0,
            quantity: 1,
            totalPrice: 59.0,
            remarks: null,
            groupDefinition: {
              key: '-',
              order: 1,
              description: 'Mensalidade',
              sign: '(-)'
            },
            issueDate: '2023-07-19T00:00:00Z'
          }
        ]
      }
    ],
    totalAmount: 59.0,
    discount: {
      amount: 0.0,
      limitDate: '2023-07-25T00:00:00Z'
    },
    student: {
      studentReference: '1203257',
      cpf: '19168124066',
      ra: null,
      subscription: '1203257',
      name: 'HEITOR NETO',
      email: 'heitor.fernandes@bluecore.com.br',
      address: {
        street: 'RUA CLÁUDIO DAL CANTON',
        number: '1232',
        complement: '',
        city: 'INDAIATUBA',
        state: 'SP',
        zip: '13334-390',
        country: 'Brasil',
        neighborhood: 'CIDADE NOVA II'
      },
      alternativeAddress: {
        street: 'RUA CLÁUDIO DAL CANTON',
        number: '1232',
        complement: '',
        city: 'INDAIATUBA',
        state: 'SP',
        zip: '13334-390',
        country: 'Brasil',
        neighborhood: 'CIDADE NOVA II'
      }
    },
    krotonBrand: 'ANHANGUERA',
    school: {
      name: 'INDAIATUBA/SP (PTK)',
      cnpj: '38733648002789',
      address: {
        street: 'RUA CLAUDIO DAL CANTON',
        number: '89',
        complement: '',
        city: 'Indaiatuba',
        state: 'SP',
        zip: '13334390',
        country: 'Brasil',
        neighborhood: 'CIDADE NOVA II'
      }
    }
  }
}
 */
