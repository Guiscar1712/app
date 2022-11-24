const UserRepository = require('../repositories/userRepository')
const MembershipRepository = require('../repositories/membershipRepository')
const md5 = require('md5')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')

module.exports = class UserService {
    static async findById (id) {
        return await UserRepository.findById(id)
    }
    
    static async list () {
        return await UserRepository.list()
    }

    static async save(entity){
        if(entity.id){
            return await UserRepository.update({
                Id: entity.id,
                Name: entity.name,
                CPF: entity.cpf,
                Email: entity.email,
                Phone: entity.phone,
                Gender: entity.gender,
                Birthday: entity.birthday
            });
        }else{
            return await UserRepository.insert({
                Name: entity.name,
                CPF: entity.cpf,
                Email: entity.email,
                Phone: entity.phone,
                Gender: entity.gender,
                Birthday: entity.birthday
            });
        }
    }

    static async register(entity){
        if(await UserRepository.findBy({Email:entity.email})){
            throw new Error('email já cadastrado!');
        }
        if(await UserRepository.findBy({CPF:entity.cpf})){
            throw new Error('cpf já cadastrado!');
        }
        if(await UserRepository.findBy({Phone:entity.phone})){
            throw new Error('phone já cadastrado!');
        }
        const user = await this.save(entity);
            await MembershipRepository.insert({
                UserId:user.id,
                Password:md5(entity.password),
                RecoveryKey:md5(user.id+" "+entity.password)
            })
        
    }

    static async login(email, password){
        const user = await UserRepository.findBy({Email:email});
        if(!user){
            throw new Error('email não cadastrado!');
        }
        const membership = await MembershipRepository.findBy({UserId: user.id})
        if(md5(password)!=membership.password){
            throw new Error('senha inválida!');
        }
        return jwt.sign(user, config.jwtSecret);
    }
}
