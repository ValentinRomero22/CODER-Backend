export const login = {
    auth: (req, res, next) =>{
        if(req.session.username != undefined) return next()
        
        return res.status(401).render('errorLogin')
    },
    get: (req, res) =>{
        try{
            if(req.session.username != undefined){
                res.render('main', { name: req.session.username })
            } else{
                res.render('login')
            }
        } catch(error){
            return res.status(500).render('login', { error: true })
        }
    },
    post: (req, res) =>{
        try{
            const user = req.body
            req.session.username = user

            res.render('main')
        } catch(error){
            return res.status(500).send({ status: 'log in error', body: error })
        }
    }
}