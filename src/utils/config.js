require('dotenv').config()

module.exports = {
    jwtSecret: process.env.JWT_SECRET,
    support:process.env.SUPPORT,
    sendGrid:{
        key:process.env.SENDGRID_KEY,
        sender:process.env.SENDGRID_SENDER,
        //bcc:process.env.SENDGRID_BCC
    },
    azureBlobsConnection:process.env.AZUREBLOBS_CONNECTION
}