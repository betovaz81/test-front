// make session globally accessible
const globalSession = (request, response, next) => {
    
    if(request.session.user){
        //console.log("Existe user en session",request.session.user.user.name)
        response.locals.session =  request.session.user 
        
    }else{
        //console.log("No existe, redirecciona",request.session)
        response.locals.session =  ''
    }
    next()
}

// global error message
const errorMessage = (request, response, next) => {
    response.locals.errorMessage = request.session.errorMessage
    delete request.session.errorMessage
    next()
 }

module.exports = {
    globalSession,
    errorMessage
}