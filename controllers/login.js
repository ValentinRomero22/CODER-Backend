export const login = {
    get: (req, res) =>{
        return res.render('login')
    },
    post: (req, res) =>{
        res.redirect('/')
    }
}