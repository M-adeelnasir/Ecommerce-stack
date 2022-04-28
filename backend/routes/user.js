const express = require('express');
const router = express.Router();

//routes
const { register, login, logout, forgetPassword } = require('../controllers/user')

//middleware
const { chechLoginValidation, chechRegisterValidation } = require('../middleware/auth')
const { runValidator } = require("../validator/index")

router.post('/register', chechRegisterValidation, runValidator, register)
router.post('/login', chechLoginValidation, runValidator, login)
router.get('/logout', logout)
router.post('/password/forgot', forgetPassword)



module.exports = router