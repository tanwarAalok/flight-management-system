const nodemailer = require("nodemailer");

const { SMPT_MAIL, SMPT_PASSWORD } = require('./server-config');

const mailSender = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: SMPT_MAIL,
        pass: SMPT_PASSWORD
    }
});

module.exports = mailSender;