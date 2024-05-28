//Import errors
const { StatusCodes } = require('http-status-codes')
const {CustomError, BadRequest, NotFound, Unauthorized} = require('../errors/index')

//Import db
const {connection} = require('../db/connectDB')
const { error } = require('console')

//Controllers
const createUser = async (req, res) => {
    console.log('request incoming')
    const {name, email} = req.body
    connection.query('INSERT INTO users(name, email) VALUES(?,?)', [name, email], (error, result) => {
        if(error){
           console.log(error)
        }
        res.status(StatusCodes.CREATED).send('foi criado porrra')
    })
}



//Export
module.exports = {
    createUser,
}