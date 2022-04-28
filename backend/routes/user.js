const express = require('express');
const router = express.Router();

//routes
const { register, login, logout, forgetPassword, resetPassword, getCurrentUser, updatePassword, updateProfile } = require('../controllers/user')

//middleware
const { chechLoginValidation, chechRegisterValidation, resetPasswordValidation, requireSignin } = require('../middleware/auth')
const { runValidator } = require("../validator/index")



router.post('/register', chechRegisterValidation, runValidator, register)
router.post('/login', chechLoginValidation, runValidator, login)
router.get('/logout', logout)
router.put('/password/forgot', forgetPassword)
router.put('/password/forgot/:restPasswordLink', resetPasswordValidation, runValidator, resetPassword)

router.get('/me', requireSignin, getCurrentUser)
router.put('/me/updatePassword', requireSignin, updatePassword)
router.put('/me/update/profile', requireSignin, updateProfile)

module.exports = router