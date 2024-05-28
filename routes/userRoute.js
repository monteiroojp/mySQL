//Create router
const express = require('express')
const router = express.Router()


//Controllers import
const {createUser} = require('../controllers/userController')

//Routes
router.route('/register').post(createUser)

//Export
module.exports = router