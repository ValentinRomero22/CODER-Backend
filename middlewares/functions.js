export const updateSessions = (req, res, next) =>{
    req.updateSessions._garbage = Date()
    req.session.touch()
    
    return next()
}

export const isLogged = (req, res, next) =>{
    if(!req.session.admin) return res.redirect('/login')

    return next()
}