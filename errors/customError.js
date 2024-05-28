//Custom error class
class CustomErrorAPI extends Error {
    constructor(message, statusCode){
        super(message)
        this.statusCode = statusCode
    }
}

//Export
module.exports = CustomErrorAPI