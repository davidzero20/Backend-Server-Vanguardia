const { response } = require('express');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const Usuario  = require('../models/usuario');

//GET - MOSTRAR USUARIOS
const getUsuarios = async(req, res ) =>{
    
    const usuarios = await Usuario.find({}, 'nombre email password role');

    res.status(200).json({
        ok: true,
        usuarios
    })
}

//POST - INSERTAR USUARIOS
const crearUsuario = async(req, res = response) =>{

    const {email, password, nombre} = req.body;

    const errores = validationResult(req );

    if(!errores.isEmpty()){
        return res.status(400).json({
            ok: false,
            errors: errores.mapped()
        });
    }

    try {
        const existeEmail = await Usuario.findOne({email});
        if(existeEmail){
            return res.status(400).json({
                ok: false,
                msg: 'El email ingresado ya existe!!!'
            });
        }

        const usuario = new Usuario(req.body);

        //Encriptacion de Contraseña
        const encriptar = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, encriptar);

        await usuario.save();

        res.status(200).json({
            ok: true,
            usuario
        });  
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error Inesperado!!!'
        });
    } 
}

//PUT = Actualizar Usuario
const actualizarUsuario = async(req, res = response) =>{
    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {

            return res.status(404).json ({
                ok:false,
                msg: 'El id de usuario no existe!!!'
            });
            
        }

        //Actualizar
        const {password, google, email, ...campos} = req.body; 

        if (usuarioDB.email !== email) {

            const existeEmail = await Usuario.findOne ({email});
            if (existeEmail) {

                return res.status(400).json({
                    ok: false,
                    msg: 'Se encuentra un usuario con ese Email'
                });
                
            }
            
        }
        
        campos.email = email; 

        const usuarioActualizado = await Usuario.findByIdAndUpdate (uid, campos, {new:true}); 

        res.json({
            ok:true,
            usuario: usuarioActualizado
        });

    } catch (error) {

        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error Inesperado!!!'
        });
        
    }
}

//DELETE - Borrar
const borrarUsuario = async (req, res = response) => {
    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById(uid);

        if (!usuarioDB) {

            return res.status(404).json({
                ok:false,
                msg:'No existe ID de usuario'
            });
            
        }
        
        await Usuario.findByIdAndDelete(uid);

        res.json({
            ok:true,
            msg: 'Usuario Eliminado Correctamente!!!'
        });

    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            ok:false,
            msg: 'Error al borrar el registro'
        });

    }
}

module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    borrarUsuario
} 
