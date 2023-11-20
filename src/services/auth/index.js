const Util = require('../../utils/util')
const { NotFoundError,ValidationError } = require('../../utils/errors')
const constantUser = require(`../../constants/user.constants`)
const constantAuth = require(`../../constants/auth.constants`)
const jwt = require('jsonwebtoken')
const config = require('../../utils/config')
const database = require('../../database/config.database')

module.exports = class AuthService {
  constructor({
    UserService,
    UserRepository,
    MembershipRepository,
    LoggerService,
  }) {
    this.UserService = UserService
    this.UserRepository = UserRepository
    this.MembershipRepository = MembershipRepository
    this.LoggerService = LoggerService
  }

  validator = async (document) => {
    document = Util.getNumbers(document)

    const step = this.LoggerService.addStep('AuthServerValidator')

    let userData =  await this.UserRepository.findBy({ Cpf: document })
    const personalData = await this.UserService.personalDataGet(document)

    if(!personalData){
        throw new NotFoundError(`Usuario não encontrato`, [constantUser.NOT_REGISTER_CPF], constantAuth.code)
    }

    if(!userData){
        const personalEmail = personalData.emails.find(f => f.main)
        userData =  await this.UserRepository.findBy({ Email: personalEmail.email })

        if(userData){
            throw new ValidationError(`Cadastro com divergência`, [constantAuth.DIVERGENT_REGISTRATION], constantAuth.code)
        }
    }
    
    userData = await this.userRegister(userData, personalData, document)

    const providers = this.getProvidersValidator(userData)

    return {
        userId : userData.id,
        name : userData.name,
        providers
    }

  }

    async userRegister(userData, personalData, document) {
        const userEmail = userData?.email
        const personalEmail = personalData?.emails.find(f => f.main)
        const personalPhone = personalData?.telephones.find(f => (f.main && f.type == 'MOVEL') || f.type == 'MOVEL')

        if (!userEmail) {

            userData = {
                name: personalData.name,
                email: personalEmail.email,
                cpf: document,
                birthday: personalData.birthdate,
                phone: Util.getNumbers(personalPhone.number)
            }

            const transaction = await database.transaction()
            const user = await this.UserRepository.insert(userData, transaction)
            await this.MembershipRepository.insert({ UserId: user.id, }, transaction)
            await transaction.commit()

            userData.id = user.id
        }
        else if (userEmail !== personalEmail.email) {
            const updateUser = {
                email: personalEmail.email
            }

            await this.UserRepository.update(userData.id, updateUser)
        }
        return userData
    }

    getProvidersValidator(userData) {
        const providers = []

        if (config.providerValidator.email) {
            providers.push({
                provider: `VERIFICATRION_CODE`,
                receiver: `EMAIL`,
                identifier: Util.obfuscateEmail(userData.email)
            })
        }

        if (config.providerValidator.sms) {
            throw new ServerError(`Serviço não implementado`, [constantAuth.NOT_IMPLEMENTED_SMS], constantAuth.code)
        }

        if (config.providerValidator.social) {
            providers.push({
                provider: `VERIFICATRION_CODE`,
                receiver: `FIREBASE`,
                identifier: `SOCIAL`
            })
        }

        return providers
    }

    request = async({ receiver, userId }) => {

        if(receiver == 'EMAIL' && !config.providerValidator.email){
            throw new ServerError(`Serviço não implementado`, [constantAuth.NOT_IMPLEMENTED_EMAIL], constantAuth.code)
        }

        if(receiver == 'SMS' && !config.providerValidator.sms){
            throw new ServerError(`Serviço não implementado`, [constantAuth.NOT_IMPLEMENTED_SMS], constantAuth.code)
        }

        if(receiver == 'SOCIAL' && !config.providerValidator.social){
            throw new ServerError(`Serviço não implementado`, [constantAuth.NOT_IMPLEMENTED_SOCIAL], constantAuth.code)
        }

        if(receiver == 'EMAIL'){
            const userData =  await this.UserRepository.findBy({ id: userId })
            
            if(!userData){
                throw new NotFoundError(`Usuario não encontrato`, [constantUser.NOT_FOUND], constantAuth.code)
            }

            await this.UserService.sendVerificationCode(userId, userData.name, userData.email)
        
            return {
                provider: `VERIFICATRION_CODE`,
                receiver: `EMAIL`,
                identifier: Util.obfuscateEmail(userData.email)
            }
        }

    }

    login = async({ provider, userId, key }) => {
        const user = await this.UserRepository.findBy({ id: userId })
        if (!user) {
            throw new NotFoundError(`Usuario não encontrato`, [constantUser.NOT_FOUND], constantAuth.code)
        }
        
        const membership = await this.MembershipRepository.findBy({ UserId: user.id })
        if (key !== membership.recoveryKey) {
            throw new ValidationError(`Parâmetros inválidos`, [constantAuth.INVALID_KEY], constantAuth.code)
        }
        
        return { token : jwt.sign(user, config.jwtSecret)}
    }
}