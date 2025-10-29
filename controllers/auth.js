const bcrypt = require('bcrypt')


// show register page
const register = (request, response, next) =>{
    response.render('../views/auth/register',{
        title:'Register',
        name:'register',
        layout:'../views/auth/auth_layout.ejs'
    })
}

// login page
const login = (request, response, next) =>{
    response.render('../views/auth/login',{
        title:'Login',
        name:'login',
        layout:'../views/auth/auth_layout.ejs'
    })
}

// sign up user
const signup = async (request, response, next) =>{  
    next();
}



// authenticate user
const authenticate = async (request, response, next) => {
    const email = request.body.email
    const password = request.body.password
    try{
    const respuesta = await fetch("http://127.0.0.1:8000"+"/api/login", { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
        });
    
    if (!respuesta.ok) {
        console.error('failed:'+respuesta.statusText)
        throw new Error('failed:'+respuesta.statusText); // Handle login errors
    }
    const data = await respuesta.json();
    
     request.session.user = data.data
     //request.session.save()
     response.redirect('/dashboard/' )
     
    } catch (error) {
        console.error('Error during login:'+ error);
        request.session.errorMessage="Error durante login "+ error
        response.redirect('/')
        // Display error message to the user
    }  
}

// sign out user
const signOut = (request, response, next) => {
    request.session.destroy()
    return response.redirect(response.locals.base)
}


module.exports = {
    register,
    signup,
    login,
    authenticate,
    signOut
}