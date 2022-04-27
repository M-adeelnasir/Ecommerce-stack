const { body } = require('express-validator');
var expressjwt = require("express-jwt");



const User = require('../models/user')


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



//check if the user have the token 
exports.requireSignin = expressjwt({ secret: process.env.JWT_SECRET, algorithms: ['sha1', 'RS256', 'HS256'] })
//req.user

exports.checkAuth = async (req, res, next) => {

    try {


        const userId = req.user.id;
        const user = await User.findById({ _id: userId })
        if (!user) {
            return res.status(404).json({
                success: false,
                data: "User Not found"
            })
        }
        req.profile = user;
        next()

    } catch (err) {
        console.log(err);
        res.status(404).json({
            success: false,
            data: "Authentication failed"
        })
    }
}


exports.checkAdmin = async (req, res, next) => {

    try {
        const userId = req.user.id;
        const user = await User.findById({ _id: userId })
        if (!user) {
            return res.status(404).json({
                success: false,
                data: "User Not found"
            })
        }
        const isAdmin = user.role;
        if (isAdmin !== "admin") {
            return res.status(404).json({
                success: false,
                data: "This user is not an admin"
            })
        }

        req.profile = user;
        next()

    } catch (err) {
        console.log(err);
        res.status(404).json({
            success: false,
            data: "User Not found"
        })
    }

}