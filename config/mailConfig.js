const { createTransport } = require('nodemailer')
const path = require("path")
const { errorLogger } = require('../utils/winstonLogger')

const EMAIL_ADRESS = process.env.EMAIL_ADRESS
const EMAIL_PASSWORD = process.env.EMAIL_PASSWORD

const transporter = createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: EMAIL_ADRESS,
        pass: EMAIL_PASSWORD
    }
})

const sendRegisterMail = async (user) => {
    const rol = user.isAdmin ? 'Administrador' : 'Usuario'

    try {
        const mailOptions = {
            from: EMAIL_ADRESS,
            to: EMAIL_ADRESS,
            subject: 'Nuevo registro',
            attachments: [
                {
                    filename: `${user.image}`,
                    path: path.join(__dirname, '../public/usersImages/') + user.image
                }
            ],
            html: '<h1>Nuevo registro</h1></br>' +
                `<h2>El usuario ${user.username} se ha registrado en el sistema</h2></br>` +
                '<h3>Datos del nuevo usuario:</h3></br>' +
                `<p>Rol en el sistema: ${rol}</p></br>` +
                `<p>Correo: ${user.email}</p></br>` +
                `<p>Teléfono: ${user.phone}</p></br>` +
                `<p>Dirección: ${user.address}</p></br>` +
                `<p>Edad: ${user.age}</p></br>`
        }

        await transporter.sendMail(mailOptions)
    } catch (error) {
        errorLogger.error(`mailConfig.js | sendMail(): ${error}`)
    }
}

const sendOrderMail = async (htmlProductsList, user) => {
    try {
        const mailOptions = {
            from: EMAIL_ADRESS,
            to: EMAIL_ADRESS,
            subject: `Nuevo pedido de ${user.username}`,
            html: '<h1>Detalle del pedido</h1></br></br>' +
                '<h2>Productos:</h2></br>' +
                `<div><p>${htmlProductsList}</p></div></br>` +
                `<div><p>Mail del comprador: ${user.email}</p></div>`
        }

        await transporter.sendMail(mailOptions)
    } catch (error) {
        errorLogger.error(`mailConfig.js | sendMail(): ${error}`)
    }
}

module.exports = { sendRegisterMail, sendOrderMail }