export const login = {
    get: (req, res) =>{
        console.log('login get')
        try{
            if(req.isAuthenticated()){
                res.redirect('/')
            } else{
                res.render('login')
            }
        } catch(error){
            return res.status(500).send({ error: true })
        }
    },
    post: (req, res) =>{
        console.log('login post')
        try{
            const { username } = req.user
            req.session.username = username
            res.redirect('/')
        } catch(error){
            return res.status(500).send({ error: true })
        }
    },
    error: (req, res) => {
        console.log('login error')
        try {
            res.render('errorLogin')
        } catch (error) {
            return res.status(500).send({ error: true })
        }
    }
}