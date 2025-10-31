require('dotenv').config({'path':'./.env'})
const express = require('express');
const path = require('path')
const session = require('express-session')
const expressLayout = require('express-ejs-layouts')
const globalSession = require('./middlewares/session')
const localeMiddleware = require('./middlewares/locale')
const bodyParser = require('body-parser')
const { I18n } = require('i18n')

const app = express();
const PORT = process.env.PORT || 3000;
const BASE_URL = process.env.BASE_URL
const API = process.env.API

const auth_routes = require('./routes/auth')
const dashboard_routes = require('./routes/dashboard')
const all_routes = require('./routes/all')

app.use(session({
   secret: process.env.SECRET,
   resave: false,
   saveUninitialized: true,
   cookie: {
      secure: false,
      maxAge:3600000
   },
   //store:store
}))


app.use(bodyParser.urlencoded({ extended: true }))

app.use(globalSession.globalSession)
app.use(globalSession.errorMessage)
app.use(globalSession.notifyMessage)

//guardamos en session base
app.locals.base = BASE_URL
app.use(function(request, response, next){
   response.locals.base = BASE_URL
   next()
})

app.use(expressLayout)
app.set('layout','./layout/app')
app.set('view engine','ejs')
app.use(localeMiddleware.currentRoute)

app.use(BASE_URL + 'css',express.static(__dirname + '/public/css'))
app.use(BASE_URL + 'js',express.static(__dirname + '/public/js'))
app.use(BASE_URL + 'img',express.static(__dirname + '/public/img'))
app.use(BASE_URL + 'fonts',express.static(__dirname + '/public/fonts'))
app.use(BASE_URL + 'json',express.static(__dirname + '/public/js/json'))

const i18n = new I18n()
i18n.configure({
   locales: ['en'],
   register:global,
   defaultLocale:'en',
   directory: path.join(__dirname, '/locales')
})


app.use(BASE_URL + '',auth_routes)
app.use(BASE_URL + '',all_routes)
app.use(BASE_URL + 'dashboard',dashboard_routes)


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});