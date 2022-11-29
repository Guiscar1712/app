const database = require('../database/config.database')
const UserRepository = require('../repositories/userRepository')
const MembershipRepository = require('../repositories/membershipRepository')
const md5 = require('md5')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const EmailService = require('./emailService')
const Util = require('../utils/util')

module.exports = class UserService {
    static async findById(id) {
        return await UserRepository.findById(id)
    }

    static async list() {
        return await UserRepository.list()
    }

    static async register(entity) {
        if (await UserRepository.findBy({ Email: entity.email })) {
            throw new Error('email já cadastrado!');
        }
        if (await UserRepository.findBy({ CPF: entity.cpf })) {
            throw new Error('cpf já cadastrado!');
        }
        if (await UserRepository.findBy({ Phone: entity.phone })) {
            throw new Error('phone já cadastrado!');
        }

        const transaction = await database.transaction();
        try {
            const user = await UserRepository.insert({
                Name: entity.name,
                CPF: entity.cpf,
                Email: entity.email,
                Phone: entity.phone,
                Gender: entity.gender,
                Birthday: entity.birthday
            }, transaction);

            const membership = await MembershipRepository.insert({
                UserId: user.id,
                RecoveryKey: Util.getNumbers(md5(user.id+" "+user.email), 5) 
            }, transaction);

            await transaction.commit();

            //await EmailService.recoverPassword(entity.email, membership.recoveryKey);

            return user;
        } catch (error) {
            console.log(error)
            await transaction.rollback()
            throw new Error('Internal error')
        }

    }

    static async validateCode(email, code){
        const user = await UserRepository.findBy({ Email: email });
        if (!user) {
            throw new Error('email não cadastrado!');
        }
        const membership = await MembershipRepository.findBy({ UserId: user.id })
        if (code != membership.recoveryKey) {
            throw new Error('código inválido!');
        }
        return true;
    }

    static async login(email, password) {
        const user = await UserRepository.findBy({ Email: email });
        if (!user) {
            throw new Error('email não cadastrado!');
        }
        const membership = await MembershipRepository.findBy({ UserId: user.id })
        if (md5(password) != membership.password) {
            throw new Error('senha inválida!');
        }
        return jwt.sign(user, config.jwtSecret);
    }

    static duplicateRegister(user, userSearch, message) {
        if (userSearch && userSearch.id != user.id) {
            throw new Error(message);
        }
    }

    static async update(entity) {
        const user = await UserRepository.findBy({ CPF: entity.cpf })

        if (!user) {
            throw new Error('cpf não cadastrado!');
        }

        this.duplicateRegister(user, await UserRepository.findBy({ Email: entity.email }), 'email já cadastrado!');
        this.duplicateRegister(user, await UserRepository.findBy({ Phone: entity.phone }), 'phone já cadastrado!');

        return await UserRepository.update(
            user.id,
            {
                Name: entity.name,
                CPF: entity.cpf,
                Email: entity.email,
                Phone: entity.phone,
                Gender: entity.gender,
                Birthday: entity.birthday
            }
        );
    }

    static async recoverPassword(cpf){
        const user = await UserRepository.findBy({ CPF: entity.cpf })
        
        if (!user) {
            throw new Error('cpf não cadastrado!');
        }

        const membership = await MembershipRepository.findBy({ UserId: user.id })
    }
}
