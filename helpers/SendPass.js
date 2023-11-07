const nodemailer = require("nodemailer");
const { generarJWT2 } = require("./generar-jwt-2");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
        user: 'programarf@gmail.com',
        pass: 'ofed kyqc dmmh fqhb'
    },
    tls: {
        rejectUnauthorized: false,
    },
});

const SendPass = async(email, password, uid) => {
    try {
        const token = await generarJWT2(uid);
        const info = await transporter.sendMail({
            from: '"Tehu System 🛰️" <programarf@gmail.com>',
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
        console.error(error.errors);
    }
}

module.exports = SendPass