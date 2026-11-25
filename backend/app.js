const express= require("express");
const path= require('path');
const session= require("express-session");
const crypto= require ("node:crypto");
require('dotenv').config();

const loginRoutes= require('./routes/loginRoutes');

const app = express();
app.use(express.urlencoded({extended:true}));
app.use(express.json());

app.use(session({
    name: "session.sid", secret: process.env.SESSION_SECRET ||      //Configura la sesion en una cookie
    crypto.randomBytes(32).toString("hex"),
    resave: false,
    saveUnitializided: false,   //Evita guardar sesiones nuevas sin datis
    cookie: {
        httpOnly: true,    //impide que JS del navegador lea la cookie
        secure: false,          //En produccion debe ser true con HTPPS
        sameSite: "lax",        //Ayuda a reducir determinados riegos CSRP
        maxAge: 1000 * 60 * 30  //Establece la duracion de la cookie (30 mins)
    }

}));

app.use(express.static(path.join(__dirname, '../frontend')));
app.use('/', loginRoutes);

app.listen(3006, ()=>{
    console.log('Servidor ejecutándose en el puerto 3006');
});