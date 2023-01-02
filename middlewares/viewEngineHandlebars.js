const { engine } = require('express-handlebars')
const Handlebars = require('handlebars')
const { allowInsecurePrototypeAccess } = require('@handlebars/allow-prototype-access')

const viewEngineHandlebars = (app, express, path) => {
    app.use('/public', express.static(path + '/public'))
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    app.set('view engine', 'hbs')
    app.set('views', 'views')

    app.engine(
        'hbs',
        engine({
            extname: 'hbs',
            defaultLayout: 'main.hbs',
            layoutsDir: path + '/views/layouts',
            partialsDir: path + '/views/partials',
            handlebars: allowInsecurePrototypeAccess(Handlebars)
        })
    )
}

module.exports = { viewEngineHandlebars }