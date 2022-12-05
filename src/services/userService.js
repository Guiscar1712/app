const database = require('../database/config.database')
const UserRepository = require('../repositories/userRepository')
const MembershipRepository = require('../repositories/membershipRepository')
const md5 = require('md5')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const EmailService = require('./emailService')
const Util = require('../utils/util')
const AzureService = require('./azureService.js')

module.exports = class UserService {
    static async findById(id) {
        return await UserRepository.findById(id)
    }

    static async list() {
        return await UserRepository.list()
    }

    static async sendCodeEmail(email) {
        const user = await UserRepository.findBy({ Email: email });
        const membership = await MembershipRepository.findBy({ UserId: user.id })
        await EmailService.recoverPassword(email, membership.recoveryKey);
    }

    static prepare(entity){
        if(entity.cpf){
            entity.cpf=Util.getNumbers(entity.cpf)
        }
        if(entity.phone){
            entity.phone=Util.getNumbers(entity.phone)
        }
        if(entity.gender){
            entity.gender = entity.gender.toUpperCase();
        }
        return entity;
    }

    static async register(entity) {
        if (await UserRepository.findBy({ Email: entity.email })) {
            await this.sendCodeEmail(entity.email);
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
            entity=this.prepare(entity);
            const user = await UserRepository.insert({
                Name: entity.name,
                CPF: entity.cpf,
                Email: entity.email,
                Phone: entity.phone,
                Gender: entity.gender,
                Birthday: entity.birthday
            }, transaction);

            await MembershipRepository.insert({
                UserId: user.id,
                RecoveryKey: Util.getNumbers(md5(user.id + " " + user.email), 5)
            }, transaction);

            await transaction.commit();

            await this.sendCodeEmail(entity.email);

            return user;
        } catch (error) {
            console.log(error)
            await transaction.rollback()
            throw new Error('Internal error')
        }

    }

    static async getRecoveryKey(email) {
        const user = await UserRepository.findBy({ Email: email });
        if (!user) {
            throw new Error('email não cadastrado!');
        }
        const membership = await MembershipRepository.findBy({ UserId: user.id })
        return membership.recoveryKey;
    }

    static async validateCode(email, code) {
        const user = await UserRepository.findBy({ Email: email });
        if (!user) {
            throw new Error('email não cadastrado!');
        }
        const membership = await MembershipRepository.findBy({ UserId: user.id })
        if (code != membership.recoveryKey) {
            throw new Error('código inválido!');
        }
        return jwt.sign(user, config.jwtSecret);
    }

    static async changePassword(email, code, password) {
        const user = await UserRepository.findBy({ Email: email });
        if (!user) {
            throw new Error('email não cadastrado!');
        }
        const membership = await MembershipRepository.findBy({ UserId: user.id, RecoveryKey: code });
        if (!membership) {
            throw new Error('código inválido!');
        }
        membership.password = md5(password);
        membership.recoveryKey = Util.getNumbers(md5(user.id + " " + user.password), 5);
        await MembershipRepository.update(membership.id, {
            Password: membership.password,
            RecoveryKey: membership.recoveryKey
        })
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

    static async photo (userId, base64){
        const user = await UserRepository.findBy({ Id: userId })
        const bloblink = await AzureService.uploadBase64('photos', base64);
        const updateEntity = { Photo: bloblink }
        
        return await UserRepository.update(
            user.id,
            updateEntity
        );
    }

    static async update(userId, entity) {
        const user = await UserRepository.findBy({ Id: userId })

        if (!user) {
            throw new Error('usuário não logado!');
        }

        this.duplicateRegister(user, await UserRepository.findBy({ CPF: entity.cpf }), 'CPF já cadastrado!');
        this.duplicateRegister(user, await UserRepository.findBy({ Email: entity.email }), 'Email já cadastrado!');
        this.duplicateRegister(user, await UserRepository.findBy({ Phone: entity.phone }), 'Phone já cadastrado!');

        let updateEntity = {};

        const add_to_update = (field) => {
            if (entity[field]) {
                const new_field = {}
                new_field[field] = entity[field];
                updateEntity = { ...updateEntity, ...new_field }
            }
        }

        add_to_update("name");
        add_to_update("cpf");
        add_to_update("email");
        add_to_update("phone");
        add_to_update("gender");
        add_to_update("birthday");
        add_to_update("city");
        add_to_update("address");
        add_to_update("number");
        add_to_update("complement");
        add_to_update("notifyFreeCourses");
        add_to_update("notifyEvents");
        add_to_update("notifyPromotions");
        add_to_update("alertWarnings");
        add_to_update("alertTeatchers");

        if (entity.photo) {
            if (entity.photo.includes("/uploads/")) {
                const fileName = entity.photo.split("/").pop();
                entity.photo = await AzureService.move("uploads", "photos", fileName);
            }

            updateEntity = { ...updateEntity, Photo: entity.photo }
        }

        updateEntity=this.prepare(updateEntity);
        return await UserRepository.update(
            user.id,
            updateEntity
        );
    }

    static async recoverPassword(cpf) {
        const user = await UserRepository.findBy({ CPF: cpf })

        if (!user) {
            throw new Error('cpf não cadastrado!');
        }

        await this.sendCodeEmail(user.email);
        return true;
    }

    static async delete(id) {


        const transaction = await database.transaction();
        try {
            await MembershipRepository.deleteBy({ UserId: id }, transaction);
            await UserRepository.deleteBy({ Id: id }, transaction)
            await transaction.commit();
        } catch (error) {
            console.log(error)
            await transaction.rollback()
            throw new Error('Internal error')
        }
    }
}
