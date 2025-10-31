const express = require('express');
const session = require('express-session');
const router = express.Router()

//router.get('/blank/:language(en|gr|ar)', [localeMiddleware.localized, authMiddleware.isAuthenticated], PageController.blank)
router.get('/', (req, res) => {
  
console.log("locals",res.locals)
const total=Math.floor(Math.random() * 100);
const ordenes=Math.floor(Math.random() * 10);

res.render('../views/pages/blank/blank',{
        title:'Escritorio',
        name:'dashboard',
        total,
        ordenes
    })

});

 
module.exports = router