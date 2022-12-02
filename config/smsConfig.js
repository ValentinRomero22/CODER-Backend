const twilio = require("twilio");
const { errorLogger } = require('../utils/winstonLogger')

const ACCOUNT_SID = process.env.TWILIO_ACCOUNT_SID;
const AUTH_TOKEN = process.env.TWILIO_AUTH_TOKEN;
const MESSAGING_SERVICE_SID = process.env.TWILIO_MESSAGING_SERVICE_SID;

const client = twilio(ACCOUNT_SID, AUTH_TOKEN);

const sendSMS = async (body, clientPhone) => {
    try {
        await client.messages.create({
            body,
            messagingServiceSid: MESSAGING_SERVICE_SID,
            to: `+${clientPhone}`
        })
    } catch (error) {
        errorLogger.error(`smsConfig.js | sendSMS(): ${error}`)
    }
};

module.exports = sendSMS;