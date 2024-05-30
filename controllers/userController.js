//Import errors
const { StatusCodes } = require('http-status-codes')
const {CustomError, BadRequest, NotFound, Unauthorized} = require('../errors/index')

//Import db
const {connection} = require('../db/connectDB')
const query = require('../db/querySchema')


//Controllers
const getAllUsers = async (req, res) => {
    const {name, email, sort} = req.query
    const queryParams = []
    const queryConditions = []
    let querySQL = 'SELECT * FROM users'

    //Query parameters
    if(name){
        queryParams.push(name)
        queryConditions.push('name=?')
    }
    
    if(email){
        queryParams.push(email)
        queryConditions.push('email=?')
    }

    if(queryConditions.length > 0){
        querySQL+= ' WHERE ' + queryConditions.join(' AND ')
    }

    //Sort parameters
    if(sort){
        const sortList = sort.split(',').map(sortItem => {
            let [field, order] = sortItem.split(':')
            order = order.toUpperCase()
            return `${field} ${order}`         
        }).join(', ')
        querySQL += ` ORDER BY ${sortList}`
    }
    

    const limit = Number(req.query.limit) || 10
    const page = Number(req.query.pages) || 1
    const offset = (page -1) * limit
    queryParams.push(offset, limit)
    querySQL += ` LIMIT ?, ?`

    console.log(querySQL, queryParams)
    const user = await query(querySQL, queryParams)
    
    if(user.length == 0){
        throw new NotFound('There is no user registred')
    }

    res.status(StatusCodes.OK).json({users: user})
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