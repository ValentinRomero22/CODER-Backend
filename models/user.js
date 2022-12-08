const joi = require('joi')

class Users {
    constructor(username, password) {
        this.username = username;
        this.password = password;
    }

    static userValidate(user, required) {
        const userSchema = joi.object({
            username: required ? joi.string().required : joi.string(),
            password: required ? joi.string().required : joi.string()
        })

        const { error } = userSchema.validate(user)
        if (error) throw error
    }
}

module.exports = Users
/* const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: { type: String, required: true, max: 100 },
    password: { type: String, required: true, max: 100 },
})

module.exports = mongoose.model('Users', userSchema) */