const nodemailer = require("nodemailer");
const { generarJWT2 } = require("../helpers/generar-jwt");


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

const sendPassEmail = async (email, password, uid) => {
    try {
        const token = await generarJWT2(uid);
        const info = await transporter.sendMail({
            from: '"Tehu System 🛰️" <admin@jc2r.com>',
            to: email,
            subject: `Usuario Creado🥷 ✔`,
            text: "Bienvenido",
            html: `
            <p>Tu contraseña es:  </p> <b>${password}</b>
            <p>Recomendamos cambiar tu contraseña lo antes posible en el siguiente enlace</p></b>
            <a href="http://localhost:5173/confirmar-password?email=${email}&token=${token}" target="_blank" ><h2>Enlace<h2></a>
            `,
        });
        console.log("Message sent: %s", info.messageId);
    } catch (error) {
        console.error(error);
    }
};

module.exports = sendPassEmail
