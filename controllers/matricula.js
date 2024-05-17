const {response} = require('express');
const {validationResult} = require('express-validator');
const Matricula = require('../models/matricula');

//GET - MOSTRAR MATRICULAS
const getMatriculas = async(req, res) => {
    const matriculas = await Matricula.find({},'alumno curso fecha');

    res.status(200).json({
        ok: true,
        matriculas
    });
}

//POST - INSERTAR MATRICULAS
const crearMatricula = async(req, res = response) => {
    const {alumno, curso, fecha} = req.body;

    const errores = validationResult(req);

    if(!errores.isEmpty()){
        return res.status(400).json({
            ok: false,
            errors: errores.mapped()
        });
    }

    try {
        const matricula = new Matricula(req.body);

        await matricula.save();

        res.status(200).json({
            ok: true,
            matricula
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error Inesperado!!!'
        });
    }
}

//PUT - ACTUALIZAR MATRICULAS
const actualizarMatricula = async(req, res = response) => {

    const matriculaId = req.params.id;

    try {
        const matricula = await Matricula.findById(matriculaId);

        if(!matricula){
            return res.status(404).json({
                ok: false,
                msg: 'La matricula no existe!!!'
            });
        }

        const nuevaMatricula = {
            ...req.body
        }

        const matriculaActualizada = await Matricula.findByIdAndUpdate (matriculaId, nuevaMatricula, {new: true});

        res.status(200).json({
            ok: true,
            matricula: matriculaActualizada
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error Inesperado!!!'
        });
    }
}

//DELETE - ELIMINAR MATRICULAS
const borrarMatricula = async(req, res = response) => {
    const matriculaId = req.params.id;

    try {
        const matricula = await Matricula.findById(matriculaId);

        if(!matricula){
            return res.status(404).json({
                ok: false,
                msg: 'La matricula no existe!!!'
            });
        }

        await Matricula.findByIdAndDelete(matriculaId);

        res.status(200).json({
            ok: true,
            msg: 'Matricula Eliminada Correctamente!!!'
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Error al borrar el registro'
        });
    }
}

module.exports = {
    getMatriculas,
    crearMatricula,
    actualizarMatricula,
    borrarMatricula
}