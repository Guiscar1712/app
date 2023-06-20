require('dotenv').config()
const logger = require('./../utils/logger.util')
const { ServiceBusClient } = require('@azure/service-bus')

const connectionString = process.env.COGNA_PAYMENT_CONNECTION_STRING
const topicName = process.env.COGNA_PAYMENT_TOPIC
const subscriptionName = process.env.COGNA_PAYMENT_SUBSCRIPTION

async function send (message, workerLog) {
  logger.info(`${workerLog} - Sending a Message to the Processing Queue..`)

  const sbClient = new ServiceBusClient(connectionString)
  const sender = sbClient.createSender(topicName, subscriptionName)

  try {
    const msg = {
      body: {
        msg: message,
        resubmitting: true
      }
    }
    await sender.sendMessages(msg)
    await sender.close()
  } catch (error) {
    logger.error({ message: `${workerLog} - Error sending message to processing queue`, error })
    return error
  }
}

module.exports = send
