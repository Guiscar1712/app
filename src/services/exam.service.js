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
}
