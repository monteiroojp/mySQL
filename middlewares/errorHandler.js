//Import status codes
const {StatusCodes} = require('http-status-codes')

//Error handler function
const errorHandler = (error, req, res, next) => {
    let customError = {
        statusCode: error.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        msg: error.message || `Something went wrong, try again later`
    }

    if(customError.msg == "Check constraint 'check_name_email_non_empty' is violated."){
        customError.statusCode = StatusCodes.BAD_REQUEST
        customError.msg = 'Must provide a password and a name when creating or updating a user!'
    }

    return res.status(customError.statusCode).send(customError.msg)
}

//Export
module.exports = errorHandler