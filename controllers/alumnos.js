const {response} = require('express');
const {validationResult} = require('express-validator');
const Alumno = require('../models/alumno');

//GET - MOSTRAR ALUMNOS
const getAlumnos = async(req, res) => {
    const alumnos = await Alumno.find({},'identidad Nombres Apellidos Direccion Telefono Fecha');

    res.status(200).json({
        ok: true,
        alumnos
    });
}

//POST - INSERTAR ALUMNOS
const crearAlumno = async(req, res = response) => {
    const {identidad, Nombres, Apellidos, Direccion, Telefono, Fecha} = req.body;

    const errores = validationResult(req);

    if(!errores.isEmpty()){
        return res.status(400).json({
            ok: false,
            errors: errores.mapped()
        });
    }

    try {
        const existeIdentidad = await Alumno.findOne({identidad});
        if(existeIdentidad){
            return res.status(400).json({
                ok: false,
                msg: 'La identidad ingresada ya existe!!!'
            });
        }

        const alumno = new Alumno(req.body);

        await alumno.save();

        res.status(200).json({
            ok: true,
            alumno
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error Inesperado!!!'
        });
    }
}

//PUT - ACTUALIZAR ALUMNOS

const actualizarAlumno = async(req, res = response) => {

    const alumnoId = req.params.id;

    try {
        const alumnoDB = await Alumno.findById(alumnoId);

        if(!alumnoDB){
            return res.status(404).json({
                ok: false,
                msg: 'El alumno no existe'
            });
        }

        const {identidad, ...campos} = req.body;

        if(alumnoDB.identidad !== identidad){
            const existeIdentidad = await Alumno.findOne({identidad});
            if(existeIdentidad){
                return res.status(400).json({
                    ok: false,
                    msg: 'Ya existe un alumno con esta identidad'
                });
            }
        }

        campos.identidad = identidad;

        const alumnoActualizado = await Alumno.findByIdAndUpdate(alumnoId, campos, {new: true});

        res.status(200).json({
            ok: true,
            alumno: alumnoActualizado
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error Inesperado!!!'
        });
    }
}

//DELETE - BORRAR ALUMNOS
const borrarAlumno = async(req, res = response) => {
    const alumnoId = req.params.id;

    try {
        const alumno = await Alumno.findById(alumnoId);

        if(!alumno){
            return res.status(404).json({
                ok: false,
                msg: 'El alumno no existe'
            });
        }
    
        await Alumno.findByIdAndDelete (alumnoId);

        res.status(200).json({
            ok: true,
            msg: 'Alumno eliminado'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error Inesperado!!!'
        });
    }
}

module.exports = {
    getAlumnos,
    crearAlumno,
    actualizarAlumno,
    borrarAlumno
}