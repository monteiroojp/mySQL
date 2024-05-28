//mySQL connection
const mysql = require("mysql2")

const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
})

const connectDB = () => {
    return new Promise((resolve, reject) => {
      connection.connect((error) => {
        if (error) {
          return reject(error);
        }
        console.log('Conectado ao MySQL!');
        resolve(connection);
      });
    });
  };

  module.exports = {connectDB, connection}