//Importacion de Express
var express = require('express');
require('dotenv').config();
const cors = require('cors');
const { dbConnection } = require('./database/config');

//Inicializar variables de Express
var app = express();

//Configuración del CORS
app.use(cors());

//Lectura y parseo del BODY
app.use(express.json());


//Base de datos
dbConnection();

//Rutas
app.use('/api/usuarios', require('./routes/usuarios'));
app.use('/api/login', require('./routes/auth'));
app.use('/api/alumnos', require('./routes/alumnos'));
app.use('/api/matriculas', require('./routes/matricula'));

//Escuchar las peticiones
app.listen(process.env.PORT, () => {
    console.log('Express Server Puerto 3001:\x1b[32m%s\x1b[0m','online');
});

