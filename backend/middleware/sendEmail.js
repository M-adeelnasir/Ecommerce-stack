const nodemailer = require("nodemailer");
const sendEmail = async (options) => {


    let transporter = nodemailer.createTransport({
        service: 'gmail',
        secure: false,
        tls: {
            rejectUnauthorized: false
        },
        host: "smtp.gmail.com",
        port: 587,
        auth: {
            user: process.env.SMPT_MAIL, // generated ethereal user
            pass: process.env.SMPT_PASS, // generated ethereal password
        },
    });


    var mailOptions = {
        from: process.env.SMPT_MAIL, // sender address
        to: options.email, // list of receivers
        subject: options.subject, // Subject line
        text: options.message, // plain text body
    };


    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error.message);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });

}

module.exports = sendEmail