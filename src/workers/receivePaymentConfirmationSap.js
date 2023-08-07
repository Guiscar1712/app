require('dotenv').config()
const logger = require('./../utils/logger.util')
const { delay, isServiceBusError, ServiceBusClient } = require('@azure/service-bus')
const sendMessages = require('./sendPaymentConfirmation')

const workerLog = 'Worker Receive Servicebus SAP'

const connectionString = process.env.COGNA_SAP_PAYMENT_CONNECTION_STRING
const topicName = process.env.COGNA_SAP_PAYMENT_TOPIC
const subscriptionName = process.env.COGNA_SAP_PAYMENT_SUBSCRIPTION

async function main () {
  logger.info(`${workerLog} - Starting...`)
  const sbClient = new ServiceBusClient(connectionString)
  const receiver = sbClient.createReceiver(topicName, subscriptionName)

  try {
    const subscription = receiver.subscribe({
      processMessage: async (brokeredMessage) => {
        const message = brokeredMessage.body
        logger.info(`${workerLog} - Received message -  OrderReference: ${message.Data.OrderReference}`)
        const res = await sendMessages(message, workerLog)
        if (res instanceof Error) {
          logger.error(`${workerLog} - Error processing message - OrderReference: ${message.Data.OrderReference}`)
          return
        }
        logger.info(`${workerLog} - Completing message - OrderReference: ${message.Data.OrderReference}`)
        await receiver.completeMessage(brokeredMessage)
      },
      processError: async (args) => {
        logger.error({ message: `${workerLog}`, error: args.errorSource, error_details: args.error })
        if (isServiceBusError(args.error)) {
          switch (args.error.code) {
            case 'MessagingEntityDisabled':
            case 'MessagingEntityNotFound':
            case 'UnauthorizedAccess':
              logger.error({ message: `${workerLog} - An unrecoverable error occurred. Stopping processing.`, error: args.errorSource, error_details: args.error })
              await subscription.close()
              break
            case 'MessageLockLost':
              logger.error({ message: `${workerLog} - Message lock lost for message.`, error: args.errorSource, error_details: args.error })
              break
            case 'ServiceBusy':
              logger.error({ message: `${workerLog} - ServiceBusy case.`, error: args.errorSource, error_details: args.error })
              await delay(1000)
              break
          }
        }
      }
    }, { autoCompleteMessages: false })
  } finally {
    logger.info(`${workerLog} - Started!`)
  }
}

module.exports = main
