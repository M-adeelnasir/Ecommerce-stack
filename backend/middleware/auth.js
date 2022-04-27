const { body } = require('express-validator');

exports.chechRegisterValidation = [
    body("name")
        .not()
        .isEmpty()
        .withMessage("Name is required"),
    body("email")
        .isEmail()
        .withMessage("Email is required"),
    body("password")
        .isLength({ min: 6 })
        .withMessage("{Password} is required"),
]

exports.chechLoginValidation = [
    body("email")
        .isEmail()
        .withMessage("Please enter a valid email"),
    body("password")
        .not()
        .isEmpty()
        .withMessage("Password is required"),
]