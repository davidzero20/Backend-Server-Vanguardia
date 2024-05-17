const {Router} = require('express');
const {check} = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');
const {getAlumnos, crearAlumno, actualizarAlumno, borrarAlumno} = require('../controllers/alumnos');
const router = Router();

//GET - MOSTRAR ALUMNOS
router.get('/', getAlumnos);

//POST - INSERTAR ALUMNOS
router.post('/', [
    check('identidad','La Identidad es obligatoria').not().isEmpty(),
    check('Nombres','El Nombre es obligatorio').not().isEmpty(),
    check('Apellidos','El Apellido es obligatorio').not().isEmpty(),
    check('Direccion','La Direccion es obligatoria').not().isEmpty(),
    check('Telefono','El Telefono es obligatorio').not().isEmpty(),
    check('FechaNac','La Fecha de Nacimiento es obligatoria').not().isEmpty(),
    validarCampos
], crearAlumno);

//PUT - ACTUALIZAR ALUMNOS
router.put('/:id', [
    check('identidad','La Identidad es obligatoria').not().isEmpty(),
    check('Nombres','El Nombre es obligatorio').not().isEmpty(),
    check('Apellidos','El Apellido es obligatorio').not().isEmpty(),
    check('Direccion','La Direccion es obligatoria').not().isEmpty(),
    check('Telefono','El Telefono es obligatorio').not().isEmpty(),
    check('FechaNac','La Fecha de Nacimiento es obligatoria').not().isEmpty(),
    validarCampos
], actualizarAlumno);

//DELETE - BORRAR ALUMNOS
router.delete('/:id', borrarAlumno);

module.exports = router;