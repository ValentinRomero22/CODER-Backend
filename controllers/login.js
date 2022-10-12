export const login = {
    get: (req, res) =>{
        try{
            if(req.isAuthenticated()){
                return res.redirect('/')
            } else{
                res.render('login')
            }
        } catch(error){
            return res.status(500).send({ error: true })
        }
    },
    post: (req, res) =>{
        try{
            req.session.username = req.user
            return res.redirect('/')
        } catch(error){
            return res.status(500).send({ error: true })
        }
    },
    error: (req, res) =>{
        try{
            res.render('errorLogin')
        } catch(error){
            return res.status(500).send({ error: true })
        }
    }
}