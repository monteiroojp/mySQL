//Create router
const express = require('express')
const router = express.Router()


//Controllers import
const {createUser, getAllUsers, getUser, updateUser, deleteUser} = require('../controllers/userController')

//Routes
router.route('/register').post(createUser)
router.route('/').get(getAllUsers)
router.route('/:id').get(getUser).patch(updateUser).delete(deleteUser)

//Export
module.exports = router