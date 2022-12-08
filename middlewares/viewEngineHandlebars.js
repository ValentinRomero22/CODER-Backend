const { engine } = require('express-handlebars')

const viewEngineHandlebars = (app, express, path) => {
    console.log(path)
    app.use('/public', express.static(path + '/public'))
    app.use(express.json())
    app.use(express.urlencoded({ extended: true }))

    app.set('view engine', 'hbs')
    app.set('views', 'views')

    app.engine(
        'hbs',
        engine({
            extname: 'hbs',
            defaultLayout: 'index.hbs',
            layoutsDir: path + '/views/layouts',
            partialsDir: path + '/views/partials',
        })
    )
}

module.exports = { viewEngineHandlebars }