const login = {
    auth: (req, res, next) =>{
        if(req.session?.user === 'valentin' && req.session?.admin){
            return next()
        }
        
        return res.status(401).render('login', { error: true })
    },
    get: (req, res) =>{
        try{
            res.status(200).render('login')
        } catch(error){
            return res.status(500).render('login', { error: true })
        }
    },
    post: (req, res) =>{
        try{
            const { user, password } = req.body

            if(user != 'valentin' || password != 'vale123'){
                return res.status(401).render('login', { error: true })
            }

            req.session.user = user
            req.session.admin = true
            const time = 600000

            req.session.cookie.maxAge = new Date(Date.now() + time)

            res.status(200).redirect('main', { root: __dirname + '/public' })
        } catch(error){
            return res.status(500).render('login', { error: true })
        }
    }
}

export default login