const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const validator = require('validator');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "Name is required"],
        max: 30,
        index: true,
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"],
        validate: [validator.isEmail, "Please enter a valid email"]
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        minlength: [6, "password should me more then 6 chars"],
        select: false
    },
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    passwordResetLink: {
        type: String,
        default: ""
    }

}, { timestamps: true })


userSchema.save('pre', async function (next) {

    if (!this.isModified('password')) {
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})


userSchema.methods.comparePassword = async function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password)
}

userSchema.methods.getJwtToken = async function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    })
}

module.exports = mongoose.model("User", userSchema)