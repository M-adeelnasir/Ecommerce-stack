const User = require('../models/user')


exports.register = async (req, res) => {
    const { email, password, name } = req.body;

    try {

        const user = await User.create({ name, email, password })

        sendToken(user, 201, res)
    } catch (err) {
        console.log(err);
        res.status(400).json({
            success: false,
            data: err.message
        })
    }

}


exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email }).select("+password")
        if (!user) {
            return res.status(400).json({
                data: "Invalid Credentials"
            })
        }
        const match = await user.matchPassword(password);

        if (!match) {
            return res.status(400).json({
                success: false,
                data: "Email or Password does not match",
            })
        }

        sendToken(user, 200, res)

    } catch (err) {
        console.log(err);
        res.status(400).json({
            success: false,
            data: err.message
        })
    }
}


//jwt token

const sendToken = async (user, statusCode, res) => {
    const token = await user.getJwtToken();

    const options = {
        expires: new Date(Date.now() + process.env.JWT_TOKEN_COOKIE_EXPIRES * 24 * 12 * 60 * 1000),
        httpOnly: true
    }

    res.status(statusCode)
        .cookie("token", token, options)
        .json({
            success: true,
            token: token,
            data: user
        })

}


//logout user
exports.logout = async (req, res) => {
    try {

        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true
        })

        res.status(200).json({
            success: true,
            data: "Logged Out"
        })

    } catch (err) {
        console.log(err);
        res.status(400).json({
            success: true,
            data: "Logged Out failed"
        })
    }
}