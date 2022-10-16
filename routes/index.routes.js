import { Router } from "express"

const indexRouter = Router()

indexRouter.get('/', (req, res, next) =>{
    if(req.isAuthenticated()){
        res.render('main', { user: req.session.username })
    } else{
        res.redirect('/login')
    }
})

export default indexRouter