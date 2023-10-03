const nodemailer = require("nodemailer");
const usuario = require("../models/user");
const generateRandomCode = require("./randomNumber");


const transporter = nodemailer.createTransport({
    host: "mail.jc2r.com",
    port: 465,
    secure: true,
    auth: {
        // TODO: replace `user` and `pass` values from <https://forwardemail.net>
        user: 'admin@jc2r.com',
        pass: 'controlremoto11'
    }
});

const senCodeEmail = async (email) => {
    const code = generateRandomCode();
    try {
        const user = await usuario.findOne({ where: { email } });
        user.code = code
        await user.save()

        const info = await transporter.sendMail({
            from: '"Tehu System 🛰️" <admin@jc2r.com>',
            to: email,
            subject: `Verificación🥷 ✔`,
            text: "Bienvenido",
            html: `<p>Tu código de acceso es:  </p> <b>${code}</b>`,
        });
        console.log("Message sent: %s", info.messageId);
    } catch (error) {
        console.error(error);
    }
};

module.exports = senCodeEmail
