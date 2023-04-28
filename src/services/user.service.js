const database = require('../database/config.database')
const UserRepository = require('../repositories/userRepository')
const UserFirebaseRepository = require('../repositories/UserFirebaseRepository')
const MembershipRepository = require('../repositories/membershipRepository')
const jwt = require('jsonwebtoken')
const config = require('../utils/config')
const EmailService = require('./email.service')
const Util = require('../utils/util')
const AzureService = require('./azure.service.js')
const { encryptPassword, comparePassword, getRecoverKey } = require('../utils/auth')
const { firebaseAdmin } = require('../services/firebase.service')

module.exports = class UserService {
  static async findById (id) {
    return await UserRepository.findById(id)
  }

  static async list () {
    return await UserRepository.list()
  }

  static async sendCodeEmail (userId, name, email) {
    const recoverKey = await UserService.getRecoveryKey(userId)
    await EmailService.recoverPassword(email, name, recoverKey)
  }

  static duplicateRegister (user, userSearch, message) {
    if (user == null) {
      if (userSearch) {
        throw new Error(message)
      }
    } else {
      if (userSearch && userSearch.id !== user.id) {
        throw new Error(message)
      }
    }
  }

  static prepare (entity) {
    if (entity.cpf) {
      entity.cpf = Util.getNumbers(entity.cpf)
    }
    if (entity.phone) {
      entity.phone = Util.getNumbers(entity.phone)
    }
    if (entity.gender) {
      entity.gender = entity.gender.toUpperCase()
    }
    return entity
  }

  static async validateEntity (user, entity) {
    if (!entity.cpf) {
      throw new Error('cpf não informado!')
    }

    if (!entity.email) {
      throw new Error('email não informado!')
    }

    entity.cpf = Util.getNumbers(entity.cpf)
    this.duplicateRegister(
      user,
      await UserRepository.findBy({ CPF: entity.cpf }),
      'CPF já cadastrado!'
    )

    if (entity.email) {
      this.duplicateRegister(
        user,
        await UserRepository.findBy({ Email: entity.email }),
        'Email já cadastrado!'
      )
    }

    entity.phone = Util.getNumbers(entity.phone)
    if (entity.phone) {
      this.duplicateRegister(
        user,
        await UserRepository.findBy({ Phone: entity.phone }),
        'Phone já cadastrado!'
      )
    }
  }

  static async register (entity) {
    // proteção para não atualizar outro registro
    if (entity.id) {
      entity.id = null
    }

    await this.validateEntity(null, entity)

    const user = await this.createdUser(entity)

    await this.sendCodeEmail(user.id, user.name, entity.email)

    return user
  }

  static async createdUser (entity) {
    const transaction = await database.transaction()
    try {
      entity = this.prepare(entity)
      const user = await UserRepository.insert(
        {
          Name: entity.name,
          CPF: entity.cpf,
          Email: entity.email,
          Phone: entity.phone,
          Gender: entity.gender,
          Birthday: entity.birthday
        },
        transaction
      )

      if (!user) {
        throw new Error('erro ao adicionar o usuário')
      }

      await MembershipRepository.insert(
        {
          UserId: user.id
        },
        transaction
      )

      await transaction.commit()

      return user
    } catch (error) {
      console.log(error.message)
      await transaction.rollback()
      throw new Error('Internal error')
    }
  }

  static async getRecovery (email) {
    const user = await UserRepository.findBy({ Email: email })
    if (!user) {
      throw new Error('email não cadastrado!')
    }

    const recoverKey = await UserService.getRecoveryKey(user.id)

    return recoverKey
  }

  static async getRecoveryKey (userId) {
    const recoverKey = await getRecoverKey()

    const membership = await MembershipRepository.findBy({
      UserId: userId
    })

    await MembershipRepository.update(membership.id, {
      RecoveryKey: recoverKey
    })
    return recoverKey
  }

  static async validateCode (email, code) {
    const user = await UserRepository.findBy({ Email: email })
    if (!user) {
      throw new Error('email não cadastrado!')
    }
    const membership = await MembershipRepository.findBy({ UserId: user.id })
    if (code !== membership.recoveryKey) {
      throw new Error('código inválido!')
    }
    return jwt.sign(user, config.jwtSecret)
  }

  static async changePassword (email, code, password) {
    if (!code) {
      throw new Error('código inválido!')
    }

    const user = await UserRepository.findBy({ Email: email })
    if (!user) {
      throw new Error('email não cadastrado!')
    }

    const membership = await MembershipRepository.findBy({
      UserId: user.id,
      RecoveryKey: code
    })

    if (!membership) {
      throw new Error('código inválido!')
    }

    membership.password = encryptPassword(password)

    await MembershipRepository.update(membership.id, {
      Password: membership.password,
      RecoveryKey: ''
    })

    return true
  }

  static async login (email, password) {
    const user = await UserRepository.findBy({ Email: email })
    if (!user) {
      throw new Error('email não cadastrado!')
    }
    const membership = await MembershipRepository.findBy({ UserId: user.id })

    if (!membership.password) {
      throw new Error('senha inválida!')
    }
    const passwordIsValid = comparePassword(password, membership.password)
    if (!passwordIsValid) {
      throw new Error('senha inválida!')
    }
    return jwt.sign(user, config.jwtSecret)
  }

  static async loginFirebase (token) {
    try {
      const decoded = await firebaseAdmin.auth().verifyIdToken(token)

      let user = await UserRepository.findBy({ Email: decoded.email })

      if (!user) {
        const name = decoded.name || ''
        user = await this.createdUser({ name, email: decoded.email })
      }

      await UserService.createdUserFirebase(decoded, user)

      const fullProfile = (!!user.CPF && !!user.Phone && !!user.Gender && !!user.Birthday)

      return { token: jwt.sign(user, config.jwtSecret), fullProfile }
    } catch (error) {
      throw new Error(error.message)
    }
  }

  static async createdUserFirebase (decoded, user) {
    const userFirebase = await UserFirebaseRepository.findByUid(decoded.uid)

    if (!userFirebase) {
      await UserFirebaseRepository.insert({
        UserId: user.id,
        Uid: decoded.uid,
        SignInProvider: decoded.firebase?.sign_in_provider
      })
    }
  }

  static async photo (userId, base64) {
    const user = await UserRepository.findBy({ Id: userId })
    const bloblink = await AzureService.uploadBase64('photos', base64)
    const updateEntity = { Photo: bloblink }

    return await UserRepository.update(user.id, updateEntity)
  }

  static async update (userId, entity) {
    const user = await UserRepository.findBy({ Id: userId })

    if (!user) {
      throw new Error('usuário não logado!')
    }

    await this.validateEntity(user, entity)

    let updateEntity = {}

    const add_to_update = field => {
      if (entity[field] || (entity[field] === false)) {
        const new_field = {}
        new_field[field] = entity[field]
        updateEntity = { ...updateEntity, ...new_field }
      }
    }

    add_to_update('name')
    add_to_update('cpf')
    add_to_update('email')
    add_to_update('phone')
    add_to_update('gender')
    add_to_update('birthday')
    add_to_update('city')
    add_to_update('address')
    add_to_update('number')
    add_to_update('complement')
    add_to_update('notifyFreeCourses')
    add_to_update('notifyEvents')
    add_to_update('notifyPromotions')
    add_to_update('alertWarnings')
    add_to_update('alertTeatchers')
    add_to_update('zipCode')
    add_to_update('state')

    if (entity.photo) {
      if (entity.photo.includes('/uploads/')) {
        const fileName = entity.photo.split('/').pop()
        entity.photo = await AzureService.move('uploads', 'photos', fileName)
      }

      updateEntity = { ...updateEntity, Photo: entity.photo }
    }

    updateEntity = this.prepare(updateEntity)
    return await UserRepository.update(user.id, updateEntity)
  }

  static async recoverPassword (cpf) {
    cpf = Util.getNumbers(cpf)
    const user = await UserRepository.findBy({ CPF: cpf })

    if (!user) {
      throw new Error('cpf não cadastrado!')
    }

    await this.sendCodeEmail(user.id, user.name, user.email)
    return user
  }

  static async delete (id) {
    const transaction = await database.transaction()

    try {
      await MembershipRepository.deleteBy({ UserId: id }, transaction)
      await UserRepository.deleteBy({ Id: id }, transaction)
      await transaction.commit()
    } catch (error) {
      console.log(error)
      await transaction.rollback()
      throw new Error('Internal error')
    }

    await UserService.deleteUsersFirebase(id)
  }

  static async deleteUsersFirebase (id) {
    const uIds = await UserFirebaseRepository.listUIdsByUserId(id)
    if (uIds.length > 0) {
      await UserFirebaseRepository.deleteBy({ UserId: id })
      await firebaseAdmin.auth().deleteUsers(uIds)
    }
  }
}
