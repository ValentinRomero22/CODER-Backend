export const updateSessions = (req, res, next) =>{
    req.session._garbage = Date()
    req.session.touch()
    
    return next()
}

export const isLogged = (req, res, next) =>{
    if(!req.session['logged']) return res.redirect('/login')

    return next()
}

export const saveSession = (req, res, next) =>{
    if(!req.body.user) return res.redirect('/')

    req.session['logged'] = { user: req.body.user }
    return next()
}

export const returnLogin = (req, res, next) =>{
    if(req.session['logged']) return res.redirect('/')
        
    return next()
}