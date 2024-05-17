//Importacion 
const mongoose = require('mongoose');

//crear funcion para conexion 
const dbConnection = async () => {
    try{
        await mongoose.connect(process.env.DB_CNN,{}); 
        console.log('Base de datos Online!!') 
    }catch(error){
         console.error('No se puede conectar a la BDD!!',error.message)
    }
}

module.exports = {
    dbConnection
}