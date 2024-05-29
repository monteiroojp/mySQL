//Import
const mysql = require('mysql2')
const { promisify } = require('util')
const {connection} = require('../db/connectDB')

//query Function
const query = promisify(connection.query).bind(connection)

module.exports = query