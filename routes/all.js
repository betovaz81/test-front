const express = require('express');
const session = require('express-session');
const authMiddleware = require('../middlewares/auth')
const router = express.Router()

 router.get("/productos",authMiddleware.isAuthenticated,async (req,res)=>{
    
    let data={};

    try{
        bearerToken= res.locals.session.token ||"";//session.get("token");

        const respuesta = await fetch("http://127.0.0.1:8000"+"/api/products", { 
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${bearerToken}`
                },
            });
    
        if (!respuesta.ok) {
            console.log(respuesta.statusText,":",respuesta.status)
            throw new Error("failed:"+respuesta.statusText); // Handle login errors
        }
        
        data = await respuesta.json();
        //console.log(data)

        }catch(error){
            console.log(error)
            res.locals.errorMessage = "Fallo la conexion"
        }

        res.render('../views/pages/all/productos',{
            title:'Productos',
            name:'productos',
            data:data
        })
 });

  router.post("/productos",async(req,res)=>{
    const bearerToken= res.locals.session.token ||"";
    const nombre = req.body.nombre
    const descripcion = req.body.descripcion
    const cantidad = req.body.cantidad
    const precio = req.body.precio

    let data={}
    try{
        const respuesta = await fetch("http://127.0.0.1:8000"+"/api/products", { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${bearerToken}`
                },
                body: JSON.stringify({ nombre, descripcion,cantidad,precio})
            });
    
        if (!respuesta.ok) {
            console.log(respuesta.statusText,":",respuesta.status)
            throw new Error("failed:"+respuesta.statusText); // Handle login errors
        }
        
        data = await respuesta.json();
        console.log(data)
        req.session.notifyMessage = "✅ Producto creado correctamente";

        }catch(error){
            console.log(error)
            req.session.notifyMessage = "❌ Falló la creación del producto";
            res.locals.errorMessage = "Fallo la conexion"
        }
     res.redirect("/productos")
 })

 ///productos/update

 router.post("/productos/update",async(req,res)=>{
    const bearerToken= res.locals.session.token ||"";
    const id = req.body.id
    const nombre = req.body.nombre
    const descripcion = req.body.descripcion
    const cantidad = req.body.cantidad
    const precio   = req.body.precio

    let data={}
    try{
        const respuesta = await fetch("http://127.0.0.1:8000"+"/api/products/update", { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${bearerToken}`
                },
                body: JSON.stringify({ id, nombre,descripcion,precio,cantidad})
            });
    
        if (!respuesta.ok) {
            console.log(respuesta.statusText,":",respuesta.status)
            throw new Error("failed:"+respuesta.statusText); // Handle login errors
        }
        
        data = await respuesta.json();
        if(data.message=="producto actualizado")
            req.session.notifyMessage = "Producto actualizado";

        }catch(error){
            console.log(error)
            req.session.notifyMessage = "❌ Falló la actualizacion del producto";
            res.locals.errorMessage = "Fallo la conexion"
        }

     res.redirect("/productos")
 })


 router.get("/usuarios",authMiddleware.isAuthenticated,async(req,res)=>{
    bearerToken= res.locals.session.token;
    let data={}
    try{

        const respuesta = await fetch("http://127.0.0.1:8000"+"/api/users", { 
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${bearerToken}`
                },
            });
    
        if (!respuesta.ok) {
            console.log(respuesta.statusText,":",respuesta.status)
            throw new Error("failed:"+respuesta.statusText); // Handle login errors
        }
        
        data = await respuesta.json();
        //console.log(data)

        }catch(error){
            console.log(error)
            res.locals.errorMessage = "Fallo la conexion"
        }


     res.render('../views/pages/all/usuarios',{
        title:'Productos',
         name:'usuarios',
         data:data
     })
 });

  router.get("/usuarios/update",authMiddleware.isAuthenticated,async(req,res)=>{
    bearerToken= res.locals.session.token;
    const id = req.body.id
    const name = req.body.name
    const descripcion = req.body.email
    const password = req.body.password

    let data={}
    try{

        const respuesta = await fetch("http://127.0.0.1:8000"+"/api/users/update", { 
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${bearerToken}`
                },
                body: JSON.stringify({ id,name,email})
            });
    
        if (!respuesta.ok) {
            console.log(respuesta.statusText,":",respuesta.status)
            throw new Error("failed:"+respuesta.statusText);
        }
        
        data = await respuesta.json();
        if(data.message=="usuario actualizado")
            req.session.notifyMessage = "Usuario actualizado";

        }catch(error){
            console.log(error)
            res.locals.errorMessage = "Error: "+error
        }


     res.render('../views/pages/all/usuarios',{
        title:'Productos',
         name:'usuarios',
         data:data
     })
 });

 router.get("/usuarios/profile",authMiddleware.isAuthenticated,async (req,res)=>{
    
    let data={};

    // try{
    //     bearerToken= res.locals.session.token ||"";//session.get("token");

    //     const respuesta = await fetch("http://127.0.0.1:8000"+"/api/products", { 
    //             method: 'get',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${bearerToken}`
    //             },
    //         });
    
    //     if (!respuesta.ok) {
    //         console.log(respuesta.statusText,":",respuesta.status)
    //         throw new Error("failed:"+respuesta.statusText); // Handle login errors
    //     }
        
    //     data = await respuesta.json();
    //     //console.log(data)

    //     }catch(error){
    //         console.log(error)
    //         res.locals.errorMessage = "Fallo la conexion"
    //     }

        res.render('../views/pages/user/profile',{
            title:'Perfil',
            name:'perfil',
            data:data
        })
 });


 
 //Guardar usuario
 router.post("/register",async(req,res)=>{
    const bearerToken= res.locals.session.token ||"";
    const email = req.body.email
    const password = req.body.password
    const name = req.body.name

    let data={}
    try{
        const respuesta = await fetch("http://127.0.0.1:8000"+"/api/register", { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${bearerToken}`
                },
                body: JSON.stringify({ email, password,name})
            });
    
        if (!respuesta.ok) {
            console.log(respuesta.statusText,":",respuesta.status)
            throw new Error("failed:"+respuesta.statusText); // Handle login errors
        }
        
        data = await respuesta.json();
        console.log(data)

        }catch(error){
            console.log(error)
            res.locals.errorMessage = "Fallo la conexion"
        }

     //res.json(data)
     res.redirect("/usuarios")
 })

 router.get("/ventas/detalle/:uuid",authMiddleware.isAuthenticated,async(req,res)=>{
    console.log(req.params); 
    const uuid=req.params.uuid
    let data={}
    // try{
    //     const bearerToken= res.locals.session.token ;
    //     const respuesta = await fetch("http://127.0.0.1:8000"+"/api/sales/details/"+uuid, { 
    //             method: 'GET',
    //             headers: {
    //                 'Content-Type': 'application/json',
    //                 'Authorization': `Bearer ${bearerToken}`
    //             }
    //         });

    //     if (!respuesta.ok) {
    //         console.log(respuesta.statusText,":",respuesta.status)
    //         throw new Error("failed:"+respuesta.statusText); // Handle login errors
    //     }
        
    //     data =  await respuesta.json();
    //     //console.log(data);
    
    // }catch(error){
    //     console.log(error)
    //     res.locals.errorMessage = "Fallo la conexion"
    // }

     res.render('../views/pages/all/details',{
         title:'Detalles Venta',
         name:'ventas',
         data
     })
 });

 router.get("/ventas",authMiddleware.isAuthenticated,async(req,res)=>{
    let data={}
    try{
        const bearerToken= res.locals.session.token ;
        const respuesta = await fetch("http://127.0.0.1:8000"+"/api/sales", { 
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${bearerToken}`
                }
            });

        if (!respuesta.ok) {
            console.log(respuesta.statusText,":",respuesta.status)
            throw new Error("failed:"+respuesta.statusText); // Handle login errors
        }
        
        data =  await respuesta.json();
        console.log(data);
    
    }catch(error){
        console.log(error)
        res.locals.errorMessage = "Fallo la conexion"
    }

     res.render('../views/pages/all/ventas',{
        title:'Productos',
         name:'ventas',
         data
     })
});

router.post("/ventas",authMiddleware.isAuthenticated, async(req,res)=>{
    console.log("📦 Datos recibidos en /ventas:");
    const p = req.body.producto;
    let producto = {}
    console.log(typeof p.id , p.id.length);

    try{
        if(typeof p.id !="string"){
             producto = p.id.map((id, index) => ({
                id: Number(id),
                cantidad: Number(req.body.producto.cantidad[index]),
                total: Number(req.body.producto.total[index])
            }));
        }else{
           producto= [p];  
        }
        const myData={product:producto}
        console.log(myData)
        const bearerToken= res.locals.session.token ;
        const respuesta = await fetch("http://127.0.0.1:8000"+"/api/sale", { 
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${bearerToken}`
                },
                body:JSON.stringify(myData)
            });
        if (!respuesta.ok) {
            console.log(respuesta.statusText,":",respuesta.status)
            throw new Error("failed:"+respuesta.statusText); // Handle login errors
        }    
        const data =  await respuesta.json();
        }catch(error){
            console.log(error)
            res.locals.errorMessage = "Fallo la conexion"
        }
    res.redirect("/ventas");
});

router.get("/ventas/car",authMiddleware.isAuthenticated,async(req,res)=>{
    let productos={};

    try{
        bearerToken= res.locals.session.token ||"";//session.get("token");

        const respuesta = await fetch("http://127.0.0.1:8000"+"/api/products", { 
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${bearerToken}`
                },
            });
    
        if (!respuesta.ok) {
            console.log(respuesta.statusText,":",respuesta.status)
            throw new Error("failed:"+respuesta.statusText); // Handle login errors
        }
        
        productos = await respuesta.json();
        //console.log(productos)

        }catch(error){
            console.log(error)
            res.locals.errorMessage = "Fallo la conexion"
        }

     res.render('../views/pages/all/car',{
        title:'Carrito',
        name:'ventas',
        data:productos
     })
});


router.post("/logout",authMiddleware.isAuthenticated,async(req,res)=>{
    delete request.session
        const bearerToken= res.locals.session.token ||"";

    try{
        const respuesta = await fetch("http://127.0.0.1:8000"+"/api/logout", { 
                method: 'get',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${bearerToken}`
                },
            });

        }catch(error){
            console.log(error)
            res.locals.errorMessage = "Error: "+error
        }
    res.redirect("/");

})
module.exports = router