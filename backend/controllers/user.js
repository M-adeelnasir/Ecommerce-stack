const User = require('../models/user')


exports.register = async (req, res) => {
    const { email, password, name } = req.body;

    try {

        const user = await User.create({ name, email, password })

        const token = await user.getJwtToken()

        res.status(201).json({
            success: true,
            data: user,
            token: token
        })
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

        const match = await user.matchPassword(password);

        const token = await user.getJwtToken()

        if (!match) {
            return res.status(400).json({
                success: false,
                data: "invalid Email or Password",
            })
        }

        res.status(200).json({
            success: true,
            token: token
        })

    } catch (err) {
        console.log(err);
        res.status(400).json({
            success: false,
            data: err.message
        })
    }
}