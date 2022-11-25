require('dotenv').config()

module.exports = {
    jwtSecret: process.env.JWT_SECRET,
    sendGridKey: process.env.SENDGRID_KEY,
}