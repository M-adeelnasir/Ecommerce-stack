const express = require('express');
const router = express.Router();

const { register, login } = require('../controllers/user')
const { chechLoginValidation, chechRegisterValidation } = require('../middleware/auth')
const { runValidator } = require("../validator/index")

router.post('/register', chechRegisterValidation, runValidator, register)
router.post('/login', chechLoginValidation, runValidator, login)

module.exports = router