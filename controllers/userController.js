//Import errors
const { StatusCodes } = require('http-status-codes')
const {CustomError, BadRequest, NotFound, Unauthorized} = require('../errors/index')

//Import db
const {connection} = require('../db/connectDB')
const query = require('../db/querySchema')


//Controllers
const getAllUsers = async (req, res) => {
    const {name, email} = req.query
    const queryParams = []
    const queryConditions = []
    let querySQL = 'SELECT * FROM users'

    if(name){
        queryParams.push(name)
        queryConditions.push('name=?')
    }
    
    if(email){
        queryParams.push(name)
        queryConditions.push('email=?')
    }

    if(queryConditions.length > 0){
        querySQL+= queryConditions.join(' AND ')
    }

    const [rows] = await query(querySQL, queryParams)
    
    if(user.length == 0){
        throw new NotFound('There is no user registred')
    }

    res.status(StatusCodes.OK).json({users: rows})
}

const getUser = async (req, res) => {
    const {id} = req.params
    const user = await query('SELECT * FROM users WHERE id=?', [id])

    if(user.length == 0){
        throw new NotFound('There is no user with this Id')
    }

    res.status(StatusCodes.OK).json({user})
}

const createUser = async (req, res) => {
    const {name, email} = req.body
    const user = await query('INSERT INTO users(name, email) VALUES(?,?)', [name, email])
    res.status(StatusCodes.CREATED).json({userId: user.insertId, name, email})
}

const updateUser = async (req, res) => {
    const {id} = req.params
    const {name, email} = req.body
    const user = await connection.execute('UPDATE users SET name=?, email=? WHERE id=?', [name, email, id])

    if(user.affectedRows == 0){
        throw new NotFound('There is no user with this Id')
    }

    res.status(StatusCodes.OK).json({updated: true})
}

const deleteUser = async (req, res) => {
    const {id} = req.params
    const user = await query('DELETE FROM users WHERE id=?', [id])

    if(user.affectedRows == 0){
        throw new NotFound('There is no user with this Id')
    }

    res.status(StatusCodes.OK).json({deleted: true})
}

//Export
module.exports = {
    createUser,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser
}