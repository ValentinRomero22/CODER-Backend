const { createTransport } = require('nodemailer')
const { errorLogger } = require('../utils/winstonLogger')

const MAIL_DIR = 'valentinrq22@gmail.com'
const MAIL_PASS = 'nsvctnjmicinrytg'

const transporter = createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: MAIL_DIR,
        pass: MAIL_PASS
    }
})

const sendMail = async(user) =>{
    const rol = user.isAdmin ? 'Administrador' : 'Usuario'

    try{
        const mailOptions = {
            from: MAIL_DIR,
            to: MAIL_DIR,
            subject: 'Nuevo registro',
            html: '<h1>Nuevo registro</h1></br>' +
                    `<h2>El usuario ${user.username} se ha registrado al sistema</h2></br>` + 
                    '<h3>Datos del nuevo usuario:</h3></br>' + 
                    `<p>Rol en el sistema: ${rol}</p></br>` +
                    `<p>Correo: ${user.email}</p></br>` +
                    `<p>Teléfono: ${user.phone}</p></br>` +
                    `<p>Dirección: ${user.address}</p></br>` +
                    `<p>Edad: ${user.age}</p></br>`
        }

        const info = await transporter.sendMail(mailOptions)
        console.log(info)
    } catch(error){
        errorLogger.error(`MailConfig: ${error}`)
    }
}

module.exports = sendMail