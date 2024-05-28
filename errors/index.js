//Import
const CustomError = require('./customError')
const BadRequest = require('./badRequest')
const NotFound = require('./notFound')
const Unauthorized = require('./unauthorized')

//Export
module.exports = {
    CustomError,
    BadRequest,
    NotFound,
    Unauthorized
}