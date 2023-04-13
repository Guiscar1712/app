const examEnum = require('../enum/Exam')
const IngressoKrotonService = require('../services/ingressoKroton.service')

module.exports = class RegisterApp {
  static async apply (model, UserId) {
    try {
      return model
    } catch (error) {
      throw new Error(error)
    }
  }

  static async eligible (subscriptionKey, UserId) {
    try {
      const token = await IngressoKrotonService.getToken()
      const res = await IngressoKrotonService.eligibleExam(subscriptionKey, token.access_token)
      if (res.errors) {
        return res
      }

      if (res.provaOnlineFinalizada) {
        return 'DONE'
      } else if (res.elegivelProvaOnline) {
        return 'ELIGIBLE'
      } else if (!res.elegivelProvaOnline) {
        return 'NOT_ELIGIBLE'
      }
    } catch (error) {
      throw new Error(error)
    }
  }

  // [
  //     {
  //       id: 1528,
  //       descricao: 'A partir das suas experiências individuais, tanto profissionais quanto pessoais, redija um relato de experiência para a questão a seguir em norma-padrão escrita da língua portuguesa.Tema: O que você espera da sua carreira?'
  //     },
  //     {
  //       id: 1532,
  //       descricao: 'A partir das suas experiências individuais, tanto profissionais quanto pessoais, redija um relato de experiência para a questão a seguir em norma-padrão escrita da língua portuguesa.Tema: O que você espera da sua carreira?'
  //     },
  //     {
  //       id: 1533,
  //       descricao: 'A partir das suas experiências individuais, tanto profissionais quanto pessoais, redija um relato de experiência para a questão a seguir em norma-padrão escrita da língua portuguesa.Tema: O que você espera da sua faculdade?'
  //     },
  //     {
  //       id: 1534,
  //       descricao: 'A partir das suas experiências individuais, tanto profissionais quanto pessoais, redija um relato de experiência para a questão a seguir em norma-padrão escrita da língua portuguesa.Tema: O que você espera da sua carreira?'
  //     },
  //     {
  //       id: 1535,
  //       descricao: 'A partir das suas experiências individuais, tanto profissionais quanto pessoais, redija um relato de experiência para a questão a seguir em norma-padrão escrita da língua portuguesa.Tema: O que você espera da sua faculdade?'
  //     },
  //     {
  //       id: 1536,
  //       descricao: 'A partir das suas experiências individuais, tanto profissionais quanto pessoais, redija um relato de experiência para a questão a seguir em norma-padrão escrita da língua portuguesa.Tema: O que você espera da sua carreira?'
  //     }
  //   ]
  static async getEssayTheme () {
    return [
      {
        id: 1534,
        descricao: 'A partir das suas experiências individuais, tanto profissionais quanto pessoais, redija um relato de experiência para a questão a seguir em norma-padrão escrita da língua portuguesa.Tema: O que você espera da sua carreira?'
      },
      {
        id: 1535,
        descricao: 'A partir das suas experiências individuais, tanto profissionais quanto pessoais, redija um relato de experiência para a questão a seguir em norma-padrão escrita da língua portuguesa.Tema: O que você espera da sua faculdade?'
      }
    ]
  }

  static async getInstructions () {
    return [
      {
        id: 1,
        icon: 'language',
        descricao: 'A prova consiste em uma redação em língua Portuguesa.'
      },
      {
        id: 2,
        icon: 'volume-slash',
        descricao: 'Para que você tenha um melhor desempenho, realize a prova em um local tranquilo, sem ruídos ou distrações.'
      },
      {
        id: 3,
        icon: 'brake-warning',
        descricao: 'Evite de sair do aplicativo ou mudar de tela. Cada vez que mudar de tela, você receberá um aviso.'
      },
      {
        id: 4,
        icon: 'pen-nib-slash',
        descricao: 'Ao finalizar e enviar a redação, ela não poderá mais ser editada.'
      },
      {
        id: 5,
        icon: 'square-xmark',
        descricao: 'Não feche o App durante a redação. Caso isso aconteça, você terá que recomeçar.'
      },
      {
        id: 6,
        icon: 'memo-circle-check',
        descricao: 'Você tem 10 tentativas para concluir sua redação.'
      }
    ]
  }
}
