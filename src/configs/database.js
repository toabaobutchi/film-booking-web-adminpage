require('dotenv').config()
const mysql = require('mysql2/promise')

const connect = async () => {
    let connection = await mysql.createPool({
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME,
        waitForConnections: true,
        connectionLimit: 10,
        dateStrings: ['TIMESTAMP']
    })
    return connection
}

module.exports = { connect }
