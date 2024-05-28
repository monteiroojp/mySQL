//Import statusCodes
const {StatusCodes} = require('http-status-codes')

//Bad request class
class BadRequest extends Error{
    constructor(message){
        super(message)
        this.statusCode = StatusCodes.BAD_REQUEST
    }
}

module.exports = BadRequest

