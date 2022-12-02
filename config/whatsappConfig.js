const twilio = require("twilio")
const { errorLogger } = require('../utils/winstonLogger')

const ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const WHATSAPP_NUMBER = process.env.TWILIO_WHATSAPP_NUMBER

const client = twilio(ACCOUNT_SID, AUTH_TOKEN)

const sendWhatsapp = async (body, clientWhatsapp) => {
    try {
        await client.messages
            .create({
                body: body,
                from: WHATSAPP_NUMBER,
                to: `whatsapp:+${clientWhatsapp}`,
            })
            .then((message) => console.log(message.sid))
            .done()
    } catch (e) {
        errorLogger.error(`whatsAppConfig.js | sendWhatsapp(): ${error}`)
    }
};

module.exports = sendWhatsapp;