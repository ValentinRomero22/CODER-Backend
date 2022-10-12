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
            console.log(req)
            console.log(req.user)
            req.session.username = req.user
            res.redirect('/')
        } catch(error){
            //return res.status(500).send({ error: true })
            console.log(error)
        }
    },
    error: (req, res) =>{
        try{
            res.render('/errorLogin')
        } catch(error){
            return res.status(500).send({ error: true })
        }
    }
}