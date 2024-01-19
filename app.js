
const express = require('express');
//--- Explicación: requerimos express para poder usarlo

const routes = require('./routes');
//--- Explicación:Nos traemos de routes el modulo que necesitamos
const bodyParser = require('body-parser');
//--- Explicación:Importamos el modulo Body-Parser
const session = require('express-session');
//--- Explicación:Importamos el modulo Express-session
const middlewares = require('./middlewares');
//--- Explicación:Importamos la funcion que hemos creado en middleware

const dotenv = require('dotenv');
//--- Explicación: Requerimos el modulo Dotenv
dotenv.config();
//--- Explicación: 
const app = express();
//--- Explicación: Iniciamos express 
middlewares.setupAPP(app);
//--- Explicación: 


routes.setup(app);
//--- Explicación: Añadimos las rutas y las acciones que se realizan si se produce una solicitud
app.use(bodyParser.urlencoded({ extended: true }));

//--- Explicación: 

// -------------------------------------------------------------------------------------

app.use(session({
  secret: process.env.PALABRA_SECRETA || 'secretoSuperSecreto',
  resave: false,
  saveUninitialized: true,
}));



// -------------------------------------------------------------------------------------
const PORT = 4000;
//--- Explicación:creamos una variable donde indicamos en que puerto trabajamos

app.listen(PORT, () => {
    console.log(`Servidor en ejecución en http://localhost:${PORT}`);
  });
  //--- Explicación:Hacemos que el servidor escuche lo que esta pasandos  
  // -------------------------------------------------------------------------------------
  
