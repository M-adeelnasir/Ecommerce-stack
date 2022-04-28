const express = require('express');
const router = express.Router();

//routes
const { register, login, logout, forgetPassword, resetPassword, getCurrentUser, updatePassword, updateProfile, getAllusers, getUser, updaterUserRole, deletUser } = require('../controllers/user')

//middleware
const { chechLoginValidation, chechRegisterValidation, resetPasswordValidation, requireSignin, checkAuth, checkAdmin } = require('../middleware/auth')
const { runValidator } = require("../validator/index")



router.post('/register', chechRegisterValidation, runValidator, register)
router.post('/login', chechLoginValidation, runValidator, login)
router.put('/password/forgot', forgetPassword)
router.put('/password/forgot/:restPasswordLink', resetPasswordValidation, runValidator, resetPassword)


router.get('/logout', requireSignin, checkAuth, logout)
router.get('/me', requireSignin, checkAuth, getCurrentUser)
router.put('/me/updatePassword', requireSignin, checkAuth, updatePassword)
router.put('/me/update/profile', requireSignin, checkAuth, updateProfile)


router.get('/admin/allusers', requireSignin, checkAuth, checkAdmin, getAllusers)
router.get('/admin/getUser/:userId', requireSignin, checkAuth, checkAdmin, getUser)

router.put('/admin/update/user/:userId', requireSignin, checkAuth, checkAdmin, updaterUserRole)
router.delete('/admin/delete/user/:userId', requireSignin, checkAuth, checkAdmin, deletUser)

module.exports = router