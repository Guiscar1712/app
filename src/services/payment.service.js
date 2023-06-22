const { ingressoClient, cognaPay } = require('../clients')
const { getSubscriptionPayDto } = require('../dto/subscription')

module.exports = class PaymentService {
  static async pix (subscriptionKey) {
    try {
      const inscricao = await ingressoClient.inscricao.get(subscriptionKey)

      const payDto = getSubscriptionPayDto(inscricao)

      return await cognaPay.pix.get(payDto)
    } catch (error) {
      throw new Error(error)
    }
  }
}
