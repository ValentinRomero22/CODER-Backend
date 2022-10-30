const { errorLogger } = require('../utils/winstonLogger')

const login = {
    get: (req, res) =>{
        try{
            if(req.isAuthenticated()){
                res.redirect('/')
            } else{
                res.render('pages/login')
            }
        } catch(error){
            errorLogger.error(`login: ${error.message}`)
            return res.status(500).send({ error: true })
        }
    },
    post: (req, res) =>{
        try{
            const { username } = req.user
            req.session.username = username
            res.redirect('/')
        } catch(error){
            errorLogger.error(`login: ${error.message}`)
            return res.status(500).send({ error: true })
        }
    },
    error: (req, res) => {
        try {
            res.render('pages/errorLogin')
        } catch (error) {
            errorLogger.error(`login: ${error.message}`)
            return res.status(500).send({ error: true })
        }
    }
}

module.exports = { login }