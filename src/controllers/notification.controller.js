const NotificationService = require('../services/notification.service')
const NotificationFirebaseService = require('../services/notificationFirebase.service')

const crypto = require('crypto')
const cryptoKey = 'IkRhP+XZVoSUG9If6SeZ7Y7fmr2bFux8Un2jyOnGYFc='
const cryptoIV = 'i40wEHvc5BKAef0+0dho4MHGnw3rYK7J5WeqD8NESCo='

// const cryptoKey = 'IkRhP+XZVoSUG9If6SeZ7Y7fmr2bFux8Un2jyOnGYFc='
// const cryptoIV = 'i40wEHvc5BKAef0+0dho4MHGnw3rYK7J5WeqD8NESCo='

// const cryptoKey = 'R4ZGSI/ZprsO4LUZwXy2wZjawB9WTv+XJhRGmzcvWfQ='
// const cryptoIV = '2Z/rf728AawiBmViYy4/7+1NJAQXPaLbiRt7SLJcw+8='

const CIPHERS = {
  AES_128: 'aes128', //requires 16 byte key
  AES_128_CBC: 'aes-128-cbc', //requires 16 byte key
  AES_192: 'aes192', //requires 24 byte key
  AES_256: 'aes256', //requires 32 byte key
}

module.exports = class NotificationPreferenceController {
  static async get(request, response, next) {
    try {
      const data = await NotificationService.list(request.user.id)
      return response.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }

  static async getById(request, response, next) {
    try {
      const data = await NotificationService.getById(
        request.params.id,
        request.user.id
      )
      return response.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }

  static async insert(request, response, next) {
    try {
      const { Title, Content, NotificationId } = request.body

      const data = await NotificationService.insert(
        Title,
        Content,
        NotificationId,
        request.user.id
      )

      return response.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }

  static async notificationRead(request, response, next) {
    try {
      const data = await NotificationService.notificationRead(
        request.params.id,
        request.user.id
      )
      return response.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }

  static async notificationAllRead(request, response, next) {
    try {
      const data = await NotificationService.notificationAllRead(
        request.user.id
      )
      return response.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }

  static async notificationNotRead(request, response, next) {
    try {
      const data = await NotificationService.notificationNotRead(
        request.params.id,
        request.user.id
      )
      return response.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }

  static async delete(request, response, next) {
    try {
      const data = await NotificationService.delete(
        request.params.id,
        request.user.id
      )
      return response.status(200).json(data)
    } catch (error) {
      next(error)
    }
  }

  static async sendNotificationTopic(request, response, next) {
    try {
      const { topic, title, body } = request.body

      const res = await NotificationFirebaseService.sendFromTopic(topic, {
        title,
        body,
      })
      return response.status(200).json(res)
    } catch (error) {
      next(error)
    }
  }

  static async sendNotificationClient(request, response, next) {
    try {
      const { token, title, body, data } = request.body

      const res = await NotificationFirebaseService.sendFromClient([token], {
        title,
        body,
        data,
      })
      return response.status(200).json(res)
    } catch (error) {
      next(error)
    }
  }

  static async subscribeToTopic(request, response, next) {
    try {
      const { token, topic } = request.body

      const res = await NotificationFirebaseService.subscribeToTopic(
        token,
        topic
      )
      return response.status(200).json(res)
    } catch (error) {
      next(error)
    }
  }

  static async sendSMS(request, response, next) {
    try {
      const data = request.body
      const dataStr = JSON.stringify(data)

      // Displays output
      var output = encrypt(dataStr)
      console.log(output)

      return response.status(200).json(output)
    } catch (error) {
      next(error)
    }
  }

  static async unsubscribeFromTopic(request, response, next) {
    try {
      const { token, topic } = request.body

      const res = await NotificationFirebaseService.unsubscribeFromTopic(
        token,
        topic
      )
      return response.status(200).json(res)
    } catch (error) {
      next(error)
    }
  }
}

function decodeBase64(data) {
  let buff = Buffer.from(data, 'base64')
  let text = buff.toString('ascii')
  return text
}

function encrypt(dataStr) {
  const key = decodeBase64(cryptoKey)
  const iv = decodeBase64(cryptoIV)

  // Defining key
  // const key = crypto.randomBytes(32)
  // // Defining iv
  // const iv = crypto.randomBytes(16)

  // Creating Cipheriv with its parameter
  let cipher = crypto.createCipheriv(CIPHERS.AES_128_CBC, Buffer.from(key), iv)

  // Updating text
  let encrypted = cipher.update(dataStr)

  // Using concatenation
  encrypted = Buffer.concat([encrypted, cipher.final()])

  // Returning iv and encrypted data
  return {
    iv: iv.toString('hex'),
    encryptedData: encrypted.toString('hex'),
  }
}
