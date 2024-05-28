//Import status codes
const {StatusCodes} = require('http-status-codes')

//Not found middleware
const notFound = (req, res) => res.status(StatusCodes.NOT_FOUND).send('There is no recource in this route')

//Export
module.exports = notFound