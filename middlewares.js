const bodyParser = require('body-parser');
//--- Explicación:importamos el modulo body-parser 

const session = require('express-session');
//--- Explicación:Session importamos el modulo exprees-session 
const dotenv = require('dotenv');
//--- Explicación:Nos traemos doten, de node.js
dotenv.config();
//--- Explicación:llamamos a la funcion




const validarPalabraMiddleware = (req, res, next) => {
    const palabraCorrecta = process.env.PALABRA_SECRETA || '';
  
    if (req.body.palabra === palabraCorrecta) {
      req.session.palabraSecreta = req.body.palabra;
      next();
    } else {
      res.redirect('/?error=1');
    }
  };
  //--- Explicación:Explica si la palabara indicada coincide con la que esta cuardada

const setupAPP = (app) => {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(session({
      secret: 'secretoSuperSecreto',
      resave: false,
      saveUninitialized: true,
    }));
  };
//--- Explicación: Middleware para parsear datos del body y para sesiones con express

const verificarSesionMiddleware = (req, res, next) => {
    if (req.session.palabraSecreta) {
      next();
    } else {
      res.redirect('/?error=2');
    }
  };
  //--- Explicación:Hacemos una funcion que nos indique si la palabara es correcta o si no, en caso que sea que 
  //nos direccionara a otra dirección

module.exports = {
    validarPalabraMiddleware,
    verificarSesionMiddleware,
    setupAPP,
  };
  //--- Explicación:Indicamos que funciones se tienen que exportar del modulo middleware
