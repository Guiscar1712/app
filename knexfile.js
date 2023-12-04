require('dotenv').config()
const Util = require('./src/utils/util')
module.exports = {
  client: 'mssql',
  connection: {
    user: process.env.DATABASE_USER,
    password: process.env.DATABASE_PASSWORD,
    server: process.env.DATABASE_HOST,
    //port: parseInt(process.env.DATABASE_PORT),
    database: process.env.DATABASE_NAME,
    encrypt: process.env.DATABASE_SSL.toLowerCase() === 'true',
  },
  pool: {
    min: Util.toNumber(process.env.DATABASE_POOL_MIN) ?? 2,
    max: Util.toNumber(process.env.DATABASE_POOL_MAX) ?? 20,
  },
  migrations: {
    directory: './src/database/migrations',
    tableName: 'Migration',
  },
  seeds: {
    directory: './src/database/seeds',
  },
}
