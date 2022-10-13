export const signup = {
    get: (req, res) =>{
        try{
            if(req.isAuthenticated()){
                res.redirect('/')
            } else{
                res.render('signup')
            }
        } catch(error){
            return res.status(500).send({ error: true })
        }
    },
    post: (req, res) =>{
        try{
            req.session.username = req.user
            res.redirect('/')
        } catch(error){
            return res.status(500).send({ error: true })
        }
    },
    error: (req, res) =>{
        try{
            res.render('errorSignup')
        } catch(error){
            return res.status(500).send({ error: true })
        }
    }
}