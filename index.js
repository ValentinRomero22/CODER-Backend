const express = require('express')
const path = require('path')
const generatePassword = require('password-generator')
const { viewEngine } = require('./middlewares/middlewareFunctions')

const mongoConnect = require('./utils/mongoConnect')
const routes = require('./routes/routes')

const app = express()
mongoConnect()

viewEngine(app, express)

routes(app)

app.use(express.static(path.join(__dirname, 'client/build')))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const port = process.env.PORT || 8080;
app.listen(port);

console.log(`Server listening on ${port}`);