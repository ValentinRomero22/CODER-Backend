const admin = require('firebase-admin')
const config = require('./db/tu-pilcha-uy-firebase-adminsdk-imquh-371094f117.json')

class Product{
    constructor(){
        admin.initializeApp({
            credential: admin.credential.cert(config),
            databaseURL: 'https://tu-pilcha-uy.firebaseio.com'
        })
    }
}

module.exports = Product