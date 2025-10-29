const express = require('express');
const session = require('express-session');
const router = express.Router()

//router.get('/blank/:language(en|gr|ar)', [localeMiddleware.localized, authMiddleware.isAuthenticated], PageController.blank)
router.get('/', (req, res) => {
  //res.send('¡Hola dashboard!');
//   res.render('../views/pages/dashboard/demo_one',{
//         title:'Demo One',
//         name:'demo_one'
//     })

console.log("locals",res.locals)
console.log("session",res.locals)

res.render('../views/pages/blank/blank',{
        title:'Blank',
        name:'blank'
    })

});

 
module.exports = router