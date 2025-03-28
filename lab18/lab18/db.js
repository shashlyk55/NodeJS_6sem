const { Sequelize } = require('sequelize')
const dotenv = require('dotenv')

dotenv.config({path: './settings.env'})

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASS,
    {
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        dialect: 'mssql',
        pool:{
            max: 10,
            min: 1,
            acquire: 30000,
            idle: 10000,
        },
        dialectOptions: {
            options: {
                encrypt: false,
                trustServerCertificate: true,
            }
        }
    }
)

module.exports.sequelize = sequelize