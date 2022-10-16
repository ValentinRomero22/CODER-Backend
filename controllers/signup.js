export const signup = {
    get: (req, res) => {
        console.log('signup get')
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
    post: (req, res) => {
        console.log('signup post')
        try {
            const { username } = req.user
            req.session.username = username
            res.redirect('/')
        } catch (error) {
            return res.status(500).send({ error: true })
        }
    },
    error: (req, res) => {
        console.log('signup error')
        try {
            res.render('errorSignup')
        } catch (error) {
            return res.status(500).send({ error: true })
        }
    }
}