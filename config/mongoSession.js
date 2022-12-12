const session = require('express-session')
const MongoStore = require('connect-mongo')
const { MONGO_CONNECTION, SECRET_SESSION } = require('./config')

const mongoSession = (app) => {
    app.use(
        session({
            store: MongoStore.create({
                mongoUrl: MONGO_CONNECTION,
                mongoOptions: {
                    useNewUrlParser: true,
                    useUnifiedTopology: true
                },
            }),
            secret: SECRET_SESSION,
            cookie: {
                httpOnly: false,
                secure: false,
                maxAge: 600000,
            },
            rolling: true,
            resave: true,
            saveUninitialized: false,
        })
    )
}

module.exports = {
    mongoSession
}