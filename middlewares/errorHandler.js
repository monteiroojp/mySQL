//Import status codes
const {StatusCodes} = require('http-status-codes')

//Error handler function
const errorHandler = (error, req, res, next) => {
    let customError = {
        statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: error.message || `Something went wrong, try again later`
    }


    return res.status(customError.statusCode).json(customError.msg)
}

//Export
module.exports = errorHandler