// check if the user is authenticated
const isAuthenticated = (request, response, next) => {
    if(!request.session.user){
        //res.locals.session.token
        console.log("aqui entro a validar si esta autenticado locals:")
        console.log(response.locals)
        return response.redirect(response.locals.base)
    }
    next()
}

// check if the user is guest
const isGuest = (request, response, next) => {
     if(request.session.user){
        console.log("Redireccionamos porque tiene session")
        console.log(request.session.user)
         return response.redirect('/dashboard' )
     }
    next()
}

module.exports = {
    isAuthenticated,
    isGuest
}