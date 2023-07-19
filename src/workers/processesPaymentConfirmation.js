require('dotenv').config()
const logger = require('./../utils/logger.util')
const { delay, isServiceBusError, ServiceBusClient } = require('@azure/service-bus')
const { paymentNotification } = require('./../services/payment')

const workerLog = 'Worker Notification'

const connectionString = process.env.COGNA_PAYMENT_CONNECTION_STRING
const topicName = process.env.COGNA_PAYMENT_TOPIC
const subscriptionName = process.env.COGNA_PAYMENT_SUBSCRIPTION || {}

async function main () {
  const sbClient = new ServiceBusClient(connectionString)

  const receiver = sbClient.createReceiver(topicName, subscriptionName)

  try {
    logger.info('Start Worker')
    const subscription = receiver.subscribe({
      processMessage: async (brokeredMessage) => {
        const message = brokeredMessage.body
        logger.info(`Received message -  OrderReference: ${message.OrderReference}`)
        await paymentNotification(message)
        logger.info(`${workerLog} - Completing message - OrderReference: ${message.OrderReference}`)
        await receiver.completeMessage(brokeredMessage)
      },
      processError: async (args) => {
        logger.error(`Error from source ${args.errorSource} occurred: `, args.error)
        if (isServiceBusError(args.error)) {
          switch (args.error.code) {
            case 'MessagingEntityDisabled':
            case 'MessagingEntityNotFound':
            case 'UnauthorizedAccess':
              logger.error(`An unrecoverable error occurred. Stopping processing. ${args.error.code}`,
                args.error)
              await subscription.close()
              break
            case 'MessageLockLost':
              logger.error('Message lock lost for message', args.error)
              break
            case 'ServiceBusy':
              logger.error('ServiceBusy case')
              await delay(1000)
              break
          }
        }
      }
    }, { autoCompleteMessages: false })
    logger.info('Started Worker')
  } finally {
    logger.info('Started Finally')
  }
}

module.exports = main
